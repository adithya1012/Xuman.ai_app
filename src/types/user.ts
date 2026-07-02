export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  /** ISO date the account was created. */
  joinedAt: string;
}
