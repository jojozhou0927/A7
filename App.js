/*
 * StAuth10244: I Zhongwen Zhou, 904509 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."
 */

import { useState } from "react";
import { SafeAreaView } from "react-native";
import CameraPage from "./Camera";
import ImageEditor from "./ImageEditor";

const styles = require("./styles");

export default function App() {
  const [captured, setCaptured] = useState("");

  // Based on whether an image is captured/selected, use camera view or image editor view.
  if (captured === "") {
    return (
      <SafeAreaView style={styles.container}>
        <CameraPage capture={setCaptured} />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ImageEditor image={captured} reset={() => setCaptured("")} />
      </SafeAreaView>
    );
  }
}
