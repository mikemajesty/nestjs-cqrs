
export abstract class ICommandAdapter {}

export abstract class ICommandHandlerAdapter<T extends ICommandAdapter> {
  abstract execute(command: T): Promise<void>
}
