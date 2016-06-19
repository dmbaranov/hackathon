import { combineReducers } from 'redux'

import home from '../home/reducer'
import sailor from '../sailor/reducer'
import noDocuments from '../noDocuments/reducer'

export default combineReducers({
	home,
	sailor,
	noDocuments
});
