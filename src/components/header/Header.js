import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';

import { sizes } from '../../resources/constants';
import logo from '../../assets/images/header/logo.png';
import cartBtnIcon from '../../assets/images/header/cart-icon.png';
import goBackBtn from '../../assets/images/header/go-back-icon.png';

const Header = props => {
    const { route, navigation } = props;
    const isPorductScreen = route.name === 'Products';

    return (
        <View style={styles.container}>
            {!isPorductScreen && (
                <Pressable onPress={() => navigation.goBack()}>
                    <Image source={goBackBtn} style={styles.arrowIcon} />
                </Pressable>
            )
            }
            <Image source={logo} style={styles.logo} />
            <Pressable onPress={() => navigation.navigate('Cart')}>
                <Image source={cartBtnIcon} style={styles.cartBtn} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: sizes.headerHeight,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
    },
    arrowIcon: {
        width: 25,
        height: 21,
    },
    logo: {
        width: 96,
        height: 17,
    },
    cartBtn: {
        width: 25,
        height: 25,
    },
});

export default Header;