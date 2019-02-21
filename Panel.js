import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


class Panel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            layoutLoaded: true,
        };
    }

    toggle() {
        let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded: !this.state.expanded
        });

        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();
    }

    _setMaxHeight(event) {
        let maxHeight = event.nativeEvent.layout.height;
        this.setState({
            layoutLoaded: true,
            maxHeight,
        });
    }

    _setMinHeight(event) {
        let minHeight = event.nativeEvent.layout.height;
        this.setState({
            minHeight,
            layoutLoaded: true,
            animation: new Animated.Value(minHeight),
        });
    }

    render() {
        //this will prevent the view from showing a dropdown animation before triggering the onLayout (which triggers one frame after)
        if (!this.state.layoutLoaded)
            return null;
        else
            return (
                <Animated.View
                    style={[styles.container, { height: (this.state.animation && this.state.layoutLoaded) ? this.state.animation : null }]}>
                    {(this.props.titleButton) ?
                        (
                            (this.state.expanded) ?
                                <View
                                    style={styles.buttonTitleContainer}
                                    onLayout={(event) => this._setMinHeight(event)}>
                                    {/* //you can set up an expanded Icon, or the default one will be loaded */}
                                    <Icon.Button
                                        name={this.props.expandedIcon || "keyboard-arrow-up"}
                                        style={this.props.iconButtonStyle || styles.iconButtonStyle}
                                        onPress={() => this.toggle()}>
                                        <Text  //the title can have its style set up with props
                                            style={this.props.buttonTitleStyle || styles.buttonTitleStyle}>
                                            {this.props.title}
                                        </Text>
                                    </Icon.Button>
                                </View>
                                :
                                <View
                                    style={styles.buttonTitleContainer}
                                    onLayout={(event) => this._setMinHeight(event)}>
                                    <Icon.Button
                                        name={this.props.collapsedIcon || "keyboard-arrow-down"}
                                        style={this.props.iconButtonStyle || styles.iconButtonStyle}
                                        onPress={() => this.toggle()}>
                                        <Text
                                            style={this.props.buttonTitleStyle || styles.buttonTitleStyle}>
                                            {this.props.title}
                                        </Text>
                                    </Icon.Button>
                                </View>
                        )
                        :
                        (
                            (this.state.expanded) ?
                                <View
                                    style={styles.titleContainer}
                                    onLayout={(event) => this._setMinHeight(event)}>
                                    <Text
                                        style={this.props.titleStyle || styles.titleStyle}>
                                        {this.props.title}
                                    </Text>
                                    <Icon
                                        onPress={() => this.toggle()}
                                        style={this.props.iconStyle || styles.iconStyle}
                                        name={this.props.expandedIcon || "keyboard-arrow-up"} />
                                </View>
                                :
                                <View
                                    style={styles.titleContainer}
                                    onLayout={(event) => this._setMinHeight(event)}>
                                    <Text
                                        style={this.props.titleStyle || styles.titleStyle}>
                                        {this.props.title}
                                    </Text>
                                    <Icon
                                        onPress={() => this.toggle()}
                                        style={this.props.iconStyle || styles.iconStyle}
                                        name={this.props.collapsedIcon || "keyboard-arrow-down"} />
                                </View>
                        )
                    }

                    <View style={styles.body} onLayout={(event) => this._setMaxHeight(event)}>
                        {this.props.children}
                    </View>
                </Animated.View>
            );
    }
}


//I recommend to export these into a separate Styles.js file for your app,
//that includes an export for every page/component
// e.g export const PanelStyle = StyleSheet.create({ * stuff below* })
var styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        margin: 10,
        overflow: 'hidden',
        flexDirection: 'column'
    },
    buttonTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconButtonStyle: {
        fontSize: 30,
        color: 'white',
    },
    iconStyle: {
        fontSize: 30,
        color: 'black',
    },
    buttonTitleStyle: {
        color: 'white'
    },
    titleStyle: {
        color: 'black',
    },
    body: {
        padding: 10,
    }
});

export default Panel;