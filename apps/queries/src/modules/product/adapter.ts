import { IUsecase } from "@/utils/usecase";
import { ProductCreateInput, ProductCreateOutput } from "../../core/product/use-cases/product-create";
import { ProductDeleteInput, ProductDeleteOutput } from "../../core/product/use-cases/product-delete";
import { ProductUpdateInput, ProductUpdateOutput } from "../../core/product/use-cases/product-update";
import { ReviewCreateInput, ReviewCreateOutput } from "../../core/review/use-cases/review-create";

export abstract class IProductCreateAdapter implements IUsecase {
  abstract execute(input: ProductCreateInput): Promise<ProductCreateOutput>
}

export abstract class IProductDeleteAdapter implements IUsecase {
  abstract execute(input: ProductDeleteInput): Promise<ProductDeleteOutput>
}

export abstract class IProductUpdateAdapter implements IUsecase {
  abstract execute(input: ProductUpdateInput): Promise<ProductUpdateOutput>
}

export abstract class IReviewUpdateAdapter implements IUsecase {
  abstract execute(input: ReviewCreateInput): Promise<ReviewCreateOutput>
}