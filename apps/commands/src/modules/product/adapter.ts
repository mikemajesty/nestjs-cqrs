import { ICommandHandler } from "@nestjs/cqrs";
import { ProductCreateCommand } from "../../core/product/command/product-create";
import { ProductDeleteCommand } from "../../core/product/command/product-delete";
import { ProductUpdateCommand } from "../../core/product/command/product-update";

export abstract class IProductCreateHandlerAdapter implements ICommandHandler<ProductCreateCommand> {
  abstract execute(command: ProductCreateCommand): Promise<void>
}

export abstract class IProductUpdateHandlerAdapter implements ICommandHandler<ProductUpdateCommand> {
  abstract execute(command: ProductUpdateCommand): Promise<void>
}

export abstract class IProductDeleteHandlerAdapter implements ICommandHandler<ProductDeleteCommand> {
  abstract execute(command: ProductDeleteCommand): Promise<void>
}