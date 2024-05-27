export class UserCreatedEvent {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly name: string,
    public readonly email: string,
  ) {}
}
