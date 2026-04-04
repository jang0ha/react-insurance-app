import { InsuranceProduct } from '@/types';

export const INSURANCE_PRODUCTS: InsuranceProduct[] = [
  {
    id: '1',
    name: '무배당 실손의료비보험',
    company: '삼성생명',
    monthlyPremium: 45000,
    coverage: ['입원비', '통원비', '수술비'],
    badge: '인기',
    recommended: true
  },
  {
    id: '2',
    name: '종신보험',
    company: '동부생명',
    monthlyPremium: 65000,
    coverage: ['사망보장', '장해보장'],
    badge: '보장강화',
    recommended: false
  },
  {
    id: '3',
    name: '암보험',
    company: '한화생명',
    monthlyPremium: 35000,
    coverage: ['암진단', '항암치료', '입원비'],
    recommended: false
  },
  {
    id: '4',
    name: '주택화재보험',
    company: '현대해상',
    monthlyPremium: 28000,
    coverage: ['화재손해', '도난손해', '수해손해'],
    recommended: false
  },
  {
    id: '5',
    name: '개인배상책임보험',
    company: '농협손보',
    monthlyPremium: 32000,
    coverage: ['신체피해', '재산손해', '법률비용'],
    recommended: false
  }
];
