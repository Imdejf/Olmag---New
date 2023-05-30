import { useGtm as UseVueGTM } from '@gtm-support/vue-gtm'

export const useGTM = () => {
    const gtm = UseVueGTM()
    return gtm
}