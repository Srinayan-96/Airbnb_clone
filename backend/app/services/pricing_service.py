from decimal import Decimal, ROUND_HALF_UP
from pydantic import BaseModel

class PriceBreakdown(BaseModel):
    subtotal: Decimal
    cleaning_fee: Decimal
    service_fee: Decimal
    taxes: Decimal
    total: Decimal

def calculate_price(nightly_rate: Decimal, nights: int, cleaning_fee: Decimal,
                     service_fee_percent: float, tax_percent: float) -> PriceBreakdown:
    
    subtotal = nightly_rate * Decimal(nights)
    service_fee = subtotal * Decimal(str(service_fee_percent))
    taxable = subtotal + cleaning_fee + service_fee
    taxes = taxable * Decimal(str(tax_percent))
    total = taxable + taxes
    
    return PriceBreakdown(
        subtotal=subtotal.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP),
        cleaning_fee=cleaning_fee.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP),
        service_fee=service_fee.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP),
        taxes=taxes.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP),
        total=total.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
    )
