export interface StateModuleInterface<i> {
  create(module: i) : void;

  findAll(stateId?: string) : i[];

  find(stateId: string) : i;

  remove (stateId: string) : void
}

