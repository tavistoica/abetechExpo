/* eslint-disable react-native/no-inline-styles */
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { width } from "react-native-dimension";
import Spinner from "react-native-loading-spinner-overlay";
// import Header from "../Component/header";
import { connect } from "react-redux";
import * as actions from "../../../actions";

class DiscoveryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isVisibleFilterModal: false,
      categories: [],
    };
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Spinner visible={this.state.loading} />
        {/* <Header navigation={this.props.navigation} /> */}
        <View style={styles.container}>
          {this.props.products.category.length === 0 ? (
            <Text style={{ fontSize: 14, fontWeight: "bold", marginTop: 5 }}>
              Nothing to show
            </Text>
          ) : (
            <FlatList
              data={this.props.products.category}
              renderItem={({ item, index }) => (
                <TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      backgroundColor: this.props.settings.colors
                        .secondary_color,
                      width: "100%",
                      marginBottom: 1,
                      paddingVertical: 20,
                      textAlignVertical: "center",
                      color: "#fff",
                    }}
                  >
                    <Text
                      style={{
                        width: "100%",
                        paddingLeft: 20,
                        fontSize: 30,
                        textAlignVertical: "center",
                        marginBottom: 10,
                        color: "#fff",
                      }}
                    >
                      {item.data.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              //Setting the number of column
              contentContainerStyle={{
                justifyContent: "center",
                alignItems: "center",
              }}
              style={{ width: width(100) }}
              numColumns={1}
              keyExtractor={(_item, index) => index.toString()}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 16,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
    width: width(100),
  },
  fixedView: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: "0%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  fab: {
    backgroundColor: this.props.settings.colors.main_color,
  },
  banner_container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  list_container: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
  },
  title_label: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginLeft: 24,
    marginBottom: 24,
  },
  title: {},
  inputTxt: {
    textAlignVertical: "center",
    fontSize: 16,
    textAlign: "center",
    width: "100%",
    height: 40,
    backgroundColor: "#fff",

    borderWidth: 1,
    borderRadius: 10,
  },
  searchBar: {
    flex: 1,
    width: "100%",
  },
  formItem: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
  submit_btn: {
    height: 45,
    width: width(75),
    marginTop: 10,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStatetoProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(
  mapStatetoProps,
  actions
)(DiscoveryPage);
