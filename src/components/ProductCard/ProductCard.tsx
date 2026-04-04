import styled from 'styled-components';
import { InsuranceProduct } from '@/types';

interface ProductCardProps {
  product: InsuranceProduct;
  onSelect?: (product: InsuranceProduct) => void;
}

const Card = styled.article<{ $recommended: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--spacing-lg);
  height: 100%;
  min-height:340px;
  background: var(--color-surface);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  border: 2px solid ${props =>
    props.$recommended ? 'var(--color-primary)' : 'transparent'};
  transition: border-color var(--transition-fast), transform var(--transition-fast);
  
  
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -8px;
  right: 16px;
  background: var(--color-primary);
  color: white;
  font-size: 0.75rem;
  padding: 2px 10px;
  border-radius: 12px;
  font-weight: 600;
`;

const Name = styled.h3`
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-sm);
  color: var(--color-gray-900);
`;

const Company = styled.p`
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-md);
`;

const Premium = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
`;

const PremiumLabel = styled.span`
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const PremiumValue = styled.strong`
  font-size: var(--font-size-xl);
  color: var(--color-primary);
  font-weight: 700;
`;

const Coverage = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  flex: 1;
`;

const CoverageItem = styled.li`
  font-size: var(--font-size-sm);
  color: var(--color-gray-700);
  display: flex;
  align-items: center;
  gap: 6px;

  span {
    color: var(--color-primary);
    font-weight: 600;
    flex-shrink: 0;
  }
`;

const SelectButton = styled.button`
  width: 100%;
  padding: 10px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: var(--font-size-sm);
  transition: background var(--transition-fast);
  font-weight: 600;

  &:hover {
    background: var(--color-primary-dark);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <Card
      $recommended={product.recommended || false}
      role="article"
      aria-label={`${product.name} 보험 상품`}
    >
      {product.badge && (
        <Badge aria-label={`${product.badge} 상품`}>
          {product.badge}
        </Badge>
      )}
      <div style={{ flex: 1 }}>
        <Name>{product.name}</Name>
        <Company>{product.company}</Company>
        <Premium>
          <PremiumLabel>월 보험료</PremiumLabel>
          <PremiumValue>
            {product.monthlyPremium.toLocaleString('ko-KR')}원
          </PremiumValue>
        </Premium>
        <Coverage aria-label="보장 항목">
          {product.coverage.map((item, i) => (
            <CoverageItem key={i}>
              <span aria-hidden="true">✓</span> {item}
            </CoverageItem>
          ))}
        </Coverage>
      </div>
      {onSelect && (
        <SelectButton
          onClick={() => onSelect(product)}
          aria-label={`${product.name} 상품 선택하여 채팅에 추가`}
        >
          이 상품 상담하기
        </SelectButton>
      )}
    </Card>
  );
}
