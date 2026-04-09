import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { InsuranceProduct } from "@/types";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { INSURANCE_PRODUCTS } from "@/data/products";

interface ProductCarouselProps {
  onProductSelect?: (product: InsuranceProduct) => void;
}

const Section = styled.section`
  padding: var(--spacing-lg);
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
`;

const Title = styled.h2`
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-lg);
  color: var(--color-gray-900);
`;

const StyledSwiper = styled(Swiper)`
  padding: 0 0 40px 0;
  height: 100%;
  .swiper-wrapper {
    align-items: stretch;
  }
  .swiper-slide {
    min-width: 200px;
    height: 100%;
  }
  .swiper-button-next,
  .swiper-button-prev {
    color: var(--color-primary);
    width: 40px;
    height: 40px;
    background: rgba(37, 99, 235, 0.1);
    border-radius: 50%;
    svg {
      width: 50%;
      height: 50%;
    }
    &::after {
      font-size: 18px;
    }

    &:hover {
      background: rgba(86, 92, 105, 0.2);
    }
  }
  .swiper-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 16px;
  }
  .swiper-pagination-bullet {
    display: block;
    position: relative;
    width: 8px;
    height: 8px;
    margin: 0 8px !important;
    background: var(--color-gray-300);
    border-radius: 50%;
    transition: background var(--transition-fast);
    opacity: 1;

    /* 터치 가능 영역 확장 (가상요소) */
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 16px;
      height: 16px;
      transform: translate(-50%, -50%);
      border-radius: 50%;
    }

    &:hover {
      background: var(--color-gray-400);
    }

    &.swiper-pagination-bullet-active {
      background: var(--color-primary);
    }
  }
`;

export function ProductCarousel({ onProductSelect }: ProductCarouselProps) {
  return (
    <Section aria-label="추천 보험 상품">
      <Title>추천 상품</Title>
      <StyledSwiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={16}
        slidesPerView={1.2}
        centeredSlides={false}
        pagination={{
          clickable: true,
        }}
        a11y={{
          enabled: true,
          prevSlideMessage: "이전 상품",
          nextSlideMessage: "다음 상품",
        }}
        breakpoints={{
          768: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3 },
        }}
        style={{ overflow: "visible" }}
        aria-label="보험 상품 갤러리"
      >
        {INSURANCE_PRODUCTS.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} onSelect={onProductSelect} />
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </Section>
  );
}
