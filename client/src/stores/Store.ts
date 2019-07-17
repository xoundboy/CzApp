import Language from '../enum/Language';
import LocalStorage from '../model/LocalStorage';
import { types } from 'mobx-state-tree';

const Store = types
	.model('Store', {
		inputLanguage: types.optional(types.string, Language.ENGLISH)
	})
	.actions(self => ({
		onInputLanguageChanged: (language: Language) => {
			console.log('onInputLanguageChanged ' + language);
			LocalStorage.inputLanguage = language;
			self.inputLanguage = language;
		}
	}));

export default Store;
