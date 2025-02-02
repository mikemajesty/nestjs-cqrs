
export abstract class ICommand {}

export abstract class ICommandHandler<T extends ICommand> {
  abstract execute(command: T): Promise<void>
}

export abstract class ICommandBus {
  abstract execute(command: ICommand): Promise<void>
}
