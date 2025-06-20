import { styles } from "@/assets/styles/home.styles";
import { COLORS } from "@/constants/colors";
import { FC } from "react";
import { View, StyleSheet, Text } from "react-native";

interface Props {
  summary: {
    balance: number;
    income: number;
    expense: number;
  };
}

const BalanceCard: FC<Props> = ({ summary }) => {
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Total Balance</Text>
      <Text style={styles.balanceAmount}>
        ${parseFloat(summary.balance + "").toFixed(2)}
      </Text>
      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}> Income</Text>
          <Text style={[styles.balanceStatLabel, { color: COLORS.income }]}>
            +${parseFloat(summary.income + "").toFixed(2)}
          </Text>
        </View>
        <View style={[styles.balanceStatItem, styles.statDivider]} />

        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}> Expenses</Text>
          <Text style={[styles.balanceStatLabel, { color: COLORS.expense }]}>
            -${Math.abs(summary.expense).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BalanceCard;
