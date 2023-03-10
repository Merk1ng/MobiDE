import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    AsyncStorage,
    Alert,
    TextInput,
    Text,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import {
    Button,
    Divider,
    Input,
    Icon
} from '@rneui/themed';
import Dialog, {DialogContent, DialogFooter, DialogButton, DialogTitle} from 'react-native-popup-dialog';
import CommonFunctions from "../helpers/CommonFunctions";
export class Comment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            dialogVisible: false
        }
    }

    confirmValue() {
        this.setState({dialogVisible: false});
        this.props.onChange(this.state.value);
    }

    setValue(text) {
        this.setState({value: text});
    }


    render() {
        return (
            <View style={{backgroundColor: '#fff'}}>
                <Text style={styles.label}
                      onPress={() => {
                          this.setState({dialogVisible: true});
                      }}>Комментарий</Text>
                <TouchableOpacity
                    onPress={() => {
                        this.setState({dialogVisible: true, value: this.props.value});
                    }}>
                    <Text style={styles.comment}>{this.props.value}</Text>
                </TouchableOpacity>

                <Dialog
                    width={0.9}
                    visible={this.state.dialogVisible}
                    onTouchOutside={() => {
                        this.setState({dialogVisible: false});
                    }}
                    footer={
                        <DialogFooter style={{flexDirection: 'row'}}>
                            <DialogButton
                                text="Отмена"
                                onPress={() => {
                                    this.setState({dialogVisible: false});
                                }}
                            />
                            <DialogButton
                                text="OK"
                                onPress={() => {
                                    this.confirmValue();
                                }}
                            />
                        </DialogFooter>
                    }>
                    <DialogTitle
                        title="Комментарий"
                    />
                    <DialogContent>
                        <TextInput
                            multiline={true}
                            ref={'textInputQuantity'}
                            placeholder={"Введите комментарий"}
                            editable={true}
                            autoFocus = {true}
                            value={this.state.value}
                            onChangeText={(text) => this.setValue(text, 2)}/>
                    </DialogContent>
                </Dialog>
                <Divider/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    label: {
        marginTop: 5,
        color: "#89a",
        left: 15
    },
    comment: {
        minHeight: 20,
        paddingLeft: 15,
        paddingRight: 15
    }
});
export default Comment;
