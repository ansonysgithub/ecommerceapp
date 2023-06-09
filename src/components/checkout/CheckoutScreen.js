import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions, StyleSheet, ScrollView, TextInput, Platform, Pressable, Text } from 'react-native';

import { Picker } from '@react-native-picker/picker';

import Header from '../header/Header';
import Context from '../../context/Context';

import config from '../../resources/config';
import { sizes, colors } from '../../resources/constants';
import apiFetch from '../../resources/apiFetch';

const CheckoutScreen = props => {
    const [paymentGateways, setPaymentGateways] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPG, setCurrentPG] = useState(null);
    const { cart } = useContext(Context);
    const { message, setMessage } = useState(null);

    const fetchPG = async () => {
        const pgList = await apiFetch.get(`${config.siteURL}payment_gateways?${config.wcCredentials}`);
        console.log(pgList);

        const enabledPG = pgList.filter(pg => pg.enabled === true);
        setPaymentGateways(enabledPG);
    };

    const handlerSubmit = async () => {
        const line_items = cart.map(item => {
            return {
                product_id: item.id,
                quantity: 1,
            }
        });

        const paymentData = {
            payment_method: currentPG,
            billing: {
                first_name: name,
                email: email,
            },
            line_items,
        };

        const registerPayment = await apiFetch.post(`${config.siteURL}orders?${config.wcCredentials}`, paymentData);
        console.log(registerPayment);
    };

    useEffect(() => {
        fetchPG();
    }, []);

    return (
        <SafeAreaView>
            <Header {...props} />
            <ScrollView style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    onChangeText={newName => setName(newName)}
                    value={name}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={newEmail => setEmail(newEmail)}
                    value={email}
                />
                <Text style={styles.titleDropdown}>Payment Gateway</Text>
                <Picker
                    style={styles.dropdown}
                    selectedValue={currentPG}
                    onValueChange={newCurrentTG => setCurrentPG(newCurrentTG)}
                >
                    {paymentGateways.map(pg => (
                        <Picker.Item key={pg.id} label={pg.title} value={pg.id} />
                    ))
                    }
                </Picker>
                <Pressable
                    style={styles.buttonBuyContainer}
                    onPress={handlerSubmit}
                >
                    <Text style={styles.textBuy}>Buy</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    formContainer: {
        height:
            Platform.OS === 'ios'
                ? Dimensions.get('window').height - sizes.headerHeight - 160 - 50
                : Dimensions.get('window').height - sizes.headerHeight - 160,
    },
    input: {
        fontSize: 16,
        marginHorizontal: 8,
        marginVertical: 8,
        padding: 4,
        borderRadius: 4,
        backgroundColor: colors.white,
    },
    titleDropdown: {
        marginTop: 16,
        textAlign: 'center',
        borderStyle: 'solid',
        borderBottomColor: colors.green,
    },
    dropdown: {
        marginHorizontal: 8,
        padding: 0,
    },
    buttonBuyContainer: {
        height: sizes.ctaButton,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: colors.green,
        marginVertical: 8,
        marginHorizontal: 16,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
    },
    textBuy: {
        color: colors.lightGrey,
        fontSize: 20,
        fontWeight: 'bold',
    },
    messageContainer: {
        marginHorizontal: 8,
        marginBottom: 8,
        alignItems: 'center',
    },
    textMessage: {
        color: colors.darkGrey,
        fontSize: 14,
        fontWeight: 'bold',
    },
    buttonGoBackContainer: {
        height: sizes.ctaButton,
        alignItems: 'center',
        backgroundColor: colors.darkGrey,
        marginVertical: 8,
        marginHorizontal: 16,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
    },
    textGoBack: {
        color: colors.lightGrey,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CheckoutScreen;



