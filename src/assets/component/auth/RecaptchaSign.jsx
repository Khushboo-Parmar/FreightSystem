import React, { useRef } from 'react';
import { View, Button } from 'react-native';
import {Recaptcha} from 'react-native-recaptcha-that-works'

const RecaptchaSign = () => {
    const recaptcha = useRef();

    const send = () => {
        console.log('send!');
        this.recaptcha.current.open();
    }

    const onVerify = token => {
        console.log('success!', token);
    }

    const onExpire = () => {
        console.warn('expired!');
    }

    return (
        <View>
            <Recaptcha
                ref={recaptcha}
                siteKey="6Ldkhh4qAAAAAH1CTq6lsugLhA4bvBFBRC6Q6nwI"
                onVerify={onVerify}
                onExpire={onExpire}
                size="invisible"
            />
            <Button title="Send" onPress={send} />
        </View>
    );
}
export default RecaptchaSign;