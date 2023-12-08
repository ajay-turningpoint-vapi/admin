import { combineReducers } from "redux";

import { authReducer } from "./auth/auth.reducer";
import { BrandReducer } from "./Brand/Brand.reducer";
import { TaxReducer } from "./Tax/Tax.reducer";
import { BannerReducer } from "./Banner/Branner.reducer";
import { userReducer } from "./Users/users.reducer";
import { AttributeReducer } from "./Attribute/Attribute.reducer";
import { CategoryReducer } from "./Category/Category.reducer";
import { ProductReducer } from "./Product/Product.reducer";
import { CouponReducer } from "./Coupon/Coupon.reducer";
import { ContestReducer } from "./Contest/Contest.reducer";
import { TransactionReducer } from "./Transaction/Transaction.reducer";
import { ReelsReducer } from "./Reels/Reels.reducer";

const RootReducer = combineReducers({
  auth: authReducer,
  brand: BrandReducer,
  taxes: TaxReducer,
  banner: BannerReducer,
  users: userReducer,
  attribute: AttributeReducer,
  category: CategoryReducer,
  product: ProductReducer,
  coupon: CouponReducer,
  contest: ContestReducer,
  transaction: TransactionReducer,
  reels: ReelsReducer,
});

export default RootReducer;
