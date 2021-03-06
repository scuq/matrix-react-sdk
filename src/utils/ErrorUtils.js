/*
Copyright 2018 New Vector Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { _t } from '../languageHandler';

/**
 * Produce a translated error message for a
 * M_RESOURCE_LIMIT_EXCEEDED error
 *
 * @param {string} limitType The limit_type from the error
 * @param {string} adminContact The admin_contact from the error
 * @param {Object} strings Translateable string for different
 *     limit_type. Must include at least the empty string key
 *     which is the default. Strings may include an 'a' tag
 *     for the admin contact link.
 * @param {Object} extraTranslations Extra translation substitution functions
 *     for any tags in the strings apart from 'a'
 * @returns {*} Translated string or react component
 */
export function messageForResourceLimitError(limitType, adminContact, strings, extraTranslations) {
    let errString = strings[limitType];
    if (errString === undefined) errString = strings[''];

    const linkSub = sub => {
        if (adminContact) {
            return <a href={adminContact} target="_blank" rel="noopener">{sub}</a>;
        } else {
            return sub;
        }
    };

    if (errString.includes('<a>')) {
        return _t(errString, {}, Object.assign({ 'a': linkSub }, extraTranslations));
    } else {
        return _t(errString, {}, extraTranslations);
    }
}
