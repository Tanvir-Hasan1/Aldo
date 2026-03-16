import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback } from "react-native";
import { BellIcon, ChevronDownIcon } from "react-native-heroicons/outline";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import LanguageModal from "./LanguageModal";

export default function HomeHeader() {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<"Eng" | "Ita">("Eng");

  return (
    <View style={styles.container}>
      {/* Left items: Avatar & Text */}
      <View style={styles.leftSection}>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://ui-avatars.com/api/?name=Marco&background=0D8ABC&color=fff&rounded=true",
          }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.restaurantName} numberOfLines={1}>
            THE GOLDEN BISTRO
          </Text>
          <Text style={styles.greeting} numberOfLines={1}>
            Good Morning,
          </Text>
          <Text style={styles.greeting} numberOfLines={1}>
            Marco
          </Text>
        </View>
      </View>

      {/* Right items: Notification & Language */}
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.iconButton}>
          <BellIcon size={moderateScale(20)} color="#111827" />
          {/* Notification dot badge */}
          <View style={styles.badge} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.langSelector, isLangMenuOpen && styles.langSelectorActive]}
          onPress={() => setIsLangMenuOpen(true)}
        >
          <Text style={[styles.langText, isLangMenuOpen && styles.langTextActive]}>{selectedLang}</Text>
          <ChevronDownIcon size={moderateScale(16)} color={isLangMenuOpen ? "#FA8C4C" : "#111827"} />
        </TouchableOpacity>
      </View>

      {/* Language Modal Overlay */}
      <LanguageModal
        visible={isLangMenuOpen}
        onClose={() => setIsLangMenuOpen(false)}
        selectedLang={selectedLang}
        onSelectLang={(lang) => {
          setSelectedLang(lang);
          setIsLangMenuOpen(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(16),
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    marginRight: scale(12),
  },
  textContainer: {
    justifyContent: "center",
  },
  restaurantName: {
    fontSize: moderateScale(10, 0.3),
    fontWeight: "700",
    color: "#6B7280",
    letterSpacing: 0.5,
    marginBottom: verticalScale(2),
  },
  greeting: {
    fontSize: moderateScale(16, 0.3),
    fontWeight: "800",
    color: "#111827",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(8),
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: verticalScale(8),
    right: scale(8),
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    backgroundColor: "#FA8C4C",
  },
  langSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(6),
    borderRadius: scale(16),
  },
  langText: {
    fontSize: moderateScale(12, 0.3),
    fontWeight: "600",
    color: "#111827",
    marginRight: scale(4),
  },
  langSelectorActive: {
    backgroundColor: "#FFF0E5",
  },
  langTextActive: {
    color: "#FA8C4C",
  },
});
