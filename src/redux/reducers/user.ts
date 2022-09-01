import { GetAccountResponse } from 'bloben-interface';
import { ROLE } from '../../enums';

const user = (
  state: GetAccountResponse = {
    username: '',
    id: '',
    isTwoFactorEnabled: false,
    role: ROLE.DEMO,
  },
  action: any
) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    default:
      return state;
  }
};

export default user;
