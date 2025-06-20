import { styles } from "@/assets/styles/home.styles";
import { COLORS } from "@/constants/colors";
import { formatDate } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const CATEGORY_ICONS = {
  "Food & Drinks": "fast-food",
  Shopping: "cart",
  Transportation: "car",
  Entertainment: "film",
  Bills: "receipt",
  Income: "cash",
  Other: "ellipsis-horizontal",
};

export type ItemType = {
  amount: string;
  category: keyof typeof CATEGORY_ICONS;
  title: string;
  createdAt: string;
  id: string;
};

interface Props {
  onDelete: (id: string) => void;
  item: ItemType;
}

const TransactionItem: FC<Props> = ({ item, onDelete }) => {
  const isIncome = parseFloat(item.amount) > 0;
  const iconName = (CATEGORY_ICONS[item.category] ||
    "pricetag-outline") as keyof typeof Ionicons.glyphMap;
  return (
    <View style={styles.transactionCard}>
      <TouchableOpacity style={styles.transactionContent}>
        <View style={styles.categoryIconContainer}>
          <Ionicons
            name={iconName}
            size={22}
            color={isIncome ? COLORS.income : COLORS.expense}
          ></Ionicons>
        </View>

        <View style={styles.transactionLeft}>
          <Text style={styles.transactionTitle}>{item.title}</Text>
          <Text style={styles.transactionCategory}>{item.category}</Text>
        </View>

        <View style={styles.transactionRight}>
          <Text
            style={[
              styles.transactionAmount,
              { color: isIncome ? COLORS.income : COLORS.expense },
            ]}
          >
            {isIncome ? "+" : "-"}$
            {Math.abs(parseFloat(item.amount)).toFixed(2)}
          </Text>
          <Text style={styles.transactionDate}>
            {formatDate(item.createdAt)}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
      >
        <Ionicons name="trash-bin-outline" size={20} color={COLORS.expense} />
      </TouchableOpacity>
    </View>
  );
};

export default TransactionItem;
