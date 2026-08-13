from decimal import Decimal
from app.services.pricing_service import calculate_price

def test_calculate_price():
    nightly_rate = Decimal('100.00')
    nights = 3
    cleaning_fee = Decimal('50.00')
    service_fee_percent = 0.05
    tax_percent = 0.10
    
    # Subtotal = 100 * 3 = 300
    # Service Fee = 300 * 0.05 = 15
    # Taxable = 300 + 50 + 15 = 365
    # Taxes = 365 * 0.10 = 36.50
    # Total = 365 + 36.50 = 401.50
    
    breakdown = calculate_price(nightly_rate, nights, cleaning_fee, service_fee_percent, tax_percent)
    
    assert breakdown.subtotal == Decimal('300.00')
    assert breakdown.cleaning_fee == Decimal('50.00')
    assert breakdown.service_fee == Decimal('15.00')
    assert breakdown.taxes == Decimal('36.50')
    assert breakdown.total == Decimal('401.50')
