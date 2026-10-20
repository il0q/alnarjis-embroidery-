export interface MailInOrder {
  orderId: string;
  customerName: string;
  customerPhone: string;
  city: string;
  state: string; // الولاية
  addressDetails: string;
  garmentCategory: string;
  garmentColor: string;
  fabricType: string;
  garmentCondition: string;
  specialInstructions: string;
  embroideryText: string;
  threadColor: string;
  threadColorHex: string;
  embroideryPosition: string;
  embroideryDimensions: string;
  shippingCarrier: 'dalilee' | 'oman_post' | 'home_pickup' | 'muscat_hub';
  turnaroundSpeed: 'standard' | 'express_48h';
  estimatedCost: number;
  createdAt: string;
  uploadedGarmentPhoto?: string;
  uploadedDesignLogo?: string;
}
