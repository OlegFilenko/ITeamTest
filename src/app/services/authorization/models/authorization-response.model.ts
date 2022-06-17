import { AuthorizedUserModel } from "./authorized-user.model";

export interface AuthorizationResponseModel extends AuthorizedUserModel {
  token: string;
}
