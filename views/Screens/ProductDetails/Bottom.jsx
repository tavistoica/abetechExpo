import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import { width, height } from "react-native-dimension";
import { SliderBox } from "react-native-image-slider-box";
import OsWrapper from "../../Component/OsWrapper";
import SideViewHeader from "../../Component/SideViewHeader";

class Bottom extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      images: [],
    };
  }

  componentDidMount() {
    let tmp_images = [];
    this.props.item.data.photos.map((photo, index) => {
      tmp_images.push({ uri: photo.original });
    });
    this.setState({ images: tmp_images });
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.props = props;
    let tmp_images = [];
    this.props.item.data.photos.map((photo, index) => {
      tmp_images.push({ uri: photo.original });
    });
    this.setState({ images: tmp_images });
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <OsWrapper>
          <SideViewHeader redirect={"favs"} {...this.props} />
        </OsWrapper>
        <View style={styles.info}>
          <ScrollView>
            <SliderBox
              ImageComponentStyle={{
                width: "100%",
                height: height(50),
                backgroundColor: "#fff",
                marginTop: 5,
              }}
              images={this.state.images}
              dotColor="#FFEE58"
              inactiveDotColor="#90A4AE"
              dotStyle={{
                width: 12,
                height: 12,
                borderRadius: 12,
                marginHorizontal: 10,
                padding: 0,
                margin: 0,
              }}
            />
            <View style={styles.row}>
              <Text
                style={[
                  styles.info_title,
                  { color: this.props.settings.colors.fourth_color },
                ]}
              >
                Title
              </Text>
              <View style={{ flex: 1 }} />
              <Text
                style={[
                  styles.info_data,
                  { color: this.props.settings.colors.third_color },
                ]}
              >
                {this.props.item.data.title}
              </Text>
            </View>
            <Divider />
            <View style={styles.row}>
              <Text
                style={[
                  styles.info_title,
                  { color: this.props.settings.colors.fourth_color },
                ]}
              >
                Price
              </Text>
              <View style={{ flex: 1 }} />
              {this.props.item.data.promotion_price == null ||
              this.props.item.data.promotion_price == "" ? (
                <Text
                  style={[
                    styles.info_data,
                    { color: this.props.settings.colors.third_color },
                  ]}
                >
                  ${this.props.item.data.price}
                </Text>
              ) : (
                <Text
                  style={[
                    styles.info_data,
                    { color: this.props.settings.colors.third_color },
                  ]}
                >
                  <Text
                    style={[
                      styles.info_data,
                      {
                        color: this.props.settings.colors.third_color,
                        textDecorationLine: "line-through",
                      },
                    ]}
                  >
                    ${this.props.item.data.price}
                  </Text>
                  / ${this.props.item.data.promotion_price}
                </Text>
              )}
            </View>
            <Divider />
            <View style={styles.row}>
              <Text
                style={[
                  styles.info_title,
                  { color: this.props.settings.colors.fourth_color },
                ]}
              >
                Brand
              </Text>
              <View style={{ flex: 1 }} />
              <Text
                style={[
                  styles.info_data,
                  { color: this.props.settings.colors.third_color },
                ]}
              >
                {this.props.item.data.brand}
              </Text>
            </View>
            <Divider />
            <View style={styles.row}>
              <Text
                style={[
                  styles.info_title,
                  { color: this.props.settings.colors.fourth_color },
                ]}
              >
                Color
              </Text>
              <View style={{ flex: 1 }} />
              <Text
                style={[
                  styles.info_data,
                  { color: this.props.settings.colors.third_color },
                ]}
              >
                {this.props.item.data.color}
              </Text>
            </View>
            <Divider />
            <View style={styles.row}>
              <Text
                style={[
                  styles.info_title,
                  { color: this.props.settings.colors.fourth_color },
                ]}
              >
                Size
              </Text>
              <View style={{ flex: 1 }} />
              <Text
                style={[
                  styles.info_data,
                  { color: this.props.settings.colors.third_color },
                ]}
              >
                {this.props.item.data.size}
              </Text>
            </View>
            <Divider />
            <View style={styles.row}>
              <Text
                style={[
                  styles.info_title,
                  { color: this.props.settings.colors.fourth_color },
                ]}
              >
                Description
              </Text>
            </View>
            <Divider />
            <View style={styles.row}>
              <Text
                style={[
                  styles.desc,
                  { color: this.props.settings.colors.third_color },
                ]}
              >
                {this.props.item.data.description}
              </Text>
            </View>
            <View style={{ marginBottom: 60 }} />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    paddingLeft: 10,
  },
  header: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    width: width(100),
    height: 50,
  },
  price: {
    fontSize: 22,
    color: "#f00",
  },
  desc: {
    fontSize: 16,
    flexWrap: "wrap",
  },
  info_title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  info_data: {
    fontSize: 20,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  info: {
    flex: 16,
    width: width(100),
    padding: 10,
  },
});

export default Bottom;
