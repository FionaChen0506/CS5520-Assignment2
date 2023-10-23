import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

const PressableButton = ({children, pressedFunction, pressedStyle, defaultStyle}) => {
    return (
        <Pressable onPress={pressedFunction} style={({pressed}) => [styles.styleDefault, pressed ? pressedStyle : defaultStyle]}>
            {children}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    styleDefault: {
        backgroundColor: '#aaa',
        flexDirection: 'row',
        marginBottom: 30,
        alignItems: 'center',
        //justifyContent: 'space-between',
        borderRadius: 5,
        padding: 5,
    },
});

export default PressableButton;