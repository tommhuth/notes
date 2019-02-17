// @flow
import configureStoreDev from './configure-store.dev';
import configureStoreProd from './configure-store.prod';

let  selectedConfigureStore

if (process.env.NODE_ENV === 'production') {
    selectedConfigureStore = configureStoreProd
} else {
    selectedConfigureStore = configureStoreDev
}
   

export const { configureStore } = selectedConfigureStore;

export const { history } = selectedConfigureStore;
