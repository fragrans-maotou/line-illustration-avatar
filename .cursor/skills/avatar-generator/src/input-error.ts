/** 参考图缺失或不合格。把 message 直接告诉用户。 */

export class AvatarInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AvatarInputError";
  }
}
