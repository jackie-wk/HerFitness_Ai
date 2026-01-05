import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme';

export const CycleScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Cycle Tracker</Text>
        <Text style={styles.subtitle}>
          Monitor your menstrual cycle phases
        </Text>
      </View>

      {/* Cycle Overview */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Current Phase Prediction</Text>
        <Text style={styles.comingSoon}>Coming Soon</Text>
        <Text style={styles.description}>
          Track your menstrual cycle and get predictions for upcoming phases
        </Text>
      </View>

      {/* Cycle Educational Info */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>About Your Cycle</Text>
        
        <PhaseCard
          number={1}
          name="Menstrual Phase"
          duration="Days 1-5"
          color={theme.colors.menstrual}
          hormones="Estrogen & Progesterone Low"
          characteristics={[
            'Body is shedding uterine lining',
            'Energy and strength are lower',
            'Mood may be affected',
            'Iron needs are higher',
          ]}
          recommendations={[
            'Rest and recovery focus',
            'Gentle yoga and stretching',
            'Iron-rich foods',
            'Adequate sleep',
          ]}
        />

        <PhaseCard
          number={2}
          name="Follicular Phase"
          duration="Days 6-14"
          color={theme.colors.follicular}
          hormones="Estrogen Rising"
          characteristics={[
            'FSH triggers follicle growth',
            'Energy levels increase',
            'Mood improves',
            'Metabolism slightly increased',
          ]}
          recommendations={[
            'High-intensity workouts',
            'Strength training',
            'Start new projects',
            'Social activities',
          ]}
        />

        <PhaseCard
          number={3}
          name="Ovulation"
          duration="Days 15-17"
          color={theme.colors.ovulation}
          hormones="LH Surge, Peak Estrogen"
          characteristics={[
            'Egg is released',
            'Peak confidence and energy',
            'Highest testosterone levels',
            'Best athletic performance',
          ]}
          recommendations={[
            'Intense cardio and HIIT',
            'Compete in sports',
            'Push your limits',
            'Protein-rich diet',
          ]}
        />

        <PhaseCard
          number={4}
          name="Luteal Phase"
          duration="Days 18-28"
          color={theme.colors.luteal}
          hormones="Progesterone Rising"
          characteristics={[
            'Progesterone dominates',
            'Calorie needs increase',
            'Energy declines mid-phase',
            'Mood may be sensitive',
          ]}
          recommendations={[
            'Moderate, steady workouts',
            'Strength maintenance',
            'Complex carbs',
            'Magnesium supplements',
          ]}
        />
      </View>

      {/* Nutritional Cycle Chart */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Macro Adjustments by Phase</Text>
        
        <MacroCard
          phase="Menstrual"
          color={theme.colors.menstrual}
          carbs="40%"
          protein="30%"
          fats="30%"
          notes="Iron and folate important"
        />
        
        <MacroCard
          phase="Follicular"
          color={theme.colors.follicular}
          carbs="45%"
          protein="25%"
          fats="30%"
          notes="Lower calorie phase"
        />
        
        <MacroCard
          phase="Ovulation"
          color={theme.colors.ovulation}
          carbs="40%"
          protein="35%"
          fats="25%"
          notes="Peak performance phase"
        />
        
        <MacroCard
          phase="Luteal"
          color={theme.colors.luteal}
          carbs="50%"
          protein="25%"
          fats="25%"
          notes="Higher calorie needs (200-300 extra)"
        />
      </View>

      <View style={styles.spacing} />
    </ScrollView>
  );
};

const PhaseCard = ({
  number,
  name,
  duration,
  color,
  hormones,
  characteristics,
  recommendations,
}: {
  number: number;
  name: string;
  duration: string;
  color: string;
  hormones: string;
  characteristics: string[];
  recommendations: string[];
}) => (
  <View style={[styles.phaseCard, { borderLeftColor: color, borderLeftWidth: 4 }]}>
    <View style={styles.phaseHeader}>
      <View style={[styles.phaseBadge, { backgroundColor: color }]}>
        <Text style={styles.phaseBadgeText}>{number}</Text>
      </View>
      <View style={styles.phaseInfo}>
        <Text style={styles.phaseName}>{name}</Text>
        <Text style={styles.phaseDuration}>{duration}</Text>
      </View>
    </View>

    <Text style={styles.hormones}>{hormones}</Text>

    <Text style={styles.subHeading}>Characteristics:</Text>
    {characteristics.map((char, idx) => (
      <Text key={idx} style={styles.listItem}>• {char}</Text>
    ))}

    <Text style={styles.subHeading}>Recommendations:</Text>
    {recommendations.map((rec, idx) => (
      <Text key={idx} style={styles.listItem}>• {rec}</Text>
    ))}
  </View>
);

const MacroCard = ({
  phase,
  color,
  carbs,
  protein,
  fats,
  notes,
}: {
  phase: string;
  color: string;
  carbs: string;
  protein: string;
  fats: string;
  notes: string;
}) => (
  <View style={[styles.macroCard, { borderTopColor: color, borderTopWidth: 3 }]}>
    <Text style={[styles.macroPhase, { color }]}>{phase}</Text>
    <View style={styles.macroRow}>
      <MacroItem label="Carbs" value={carbs} />
      <MacroItem label="Protein" value={protein} />
      <MacroItem label="Fats" value={fats} />
    </View>
    <Text style={styles.macroNotes}>{notes}</Text>
  </View>
);

const MacroItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.macroItem}>
    <Text style={styles.macroLabel}>{label}</Text>
    <Text style={styles.macroValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  header: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  comingSoon: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.secondary,
    marginBottom: theme.spacing.md,
  },
  description: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  phaseCard: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  phaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  phaseBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  phaseBadgeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  phaseInfo: {
    flex: 1,
  },
  phaseName: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
  },
  phaseDuration: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  hormones: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.secondary,
    marginBottom: theme.spacing.md,
  },
  subHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.text,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  listItem: {
    fontSize: 13,
    color: theme.colors.text,
    marginVertical: theme.spacing.xs,
    lineHeight: 20,
  },
  macroCard: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  macroPhase: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: theme.spacing.md,
  },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.md,
  },
  macroItem: {
    alignItems: 'center',
  },
  macroLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  macroValue: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  macroNotes: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
  },
  spacing: {
    height: theme.spacing.xl,
  },
});
