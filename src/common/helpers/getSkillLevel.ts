import i18n from 'i18next'

const getSkillLevel = (key: string|undefined) => {
    switch(key) {
        case "1": {
            return i18n.t('low');
        }
        case "2": {
            return i18n.t('medium');
        }
        case "3": {
            return i18n.t('high');
        }

        default: {
            return i18n.t('unknown')
        }
    }
}

export default getSkillLevel