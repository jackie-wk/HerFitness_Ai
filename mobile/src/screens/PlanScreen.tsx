import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useAppStore } from '../store';
import { theme } from '../theme';
import { generateWellnessPlan } from '../api';

export const PlanScreen = ({ navigation }: any) => {
  const { profile, plan, setPlan, setLoading, isLoading, error, setError } = useAppStore();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleGeneratePlan = async () => {
    if (!profile) {
      Alert.alert('Profile Required', 'Please create your profile first');
      navigation.navigate('Profile');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await generateWellnessPlan(profile);
      setPlan(result);
      if (result.error) {
        setError(result.error);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to generate plan');
      Alert.alert('Error', err.message || 'Failed to generate wellness plan');
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No Profile Yet</Text>
          <Text style={styles.emptyText}>
            Create your profile first to generate a personalized wellness plan
          </Text>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.buttonText}>Create Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Wellness Plan</Text>
        <Text style={styles.subtitle}>
          AI-powered personalized plan for {profile.goal || 'your fitness goals'}
        </Text>
      </View>

      {!plan ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ready to Get Started?</Text>
          <Text style={styles.cardDescription}>
            We'll generate a personalized wellness plan based on your profile, cycle phase, and fitness goals.
          </Text>
          <TouchableOpacity
            style={[styles.primaryButton, isLoading && styles.buttonDisabled]}
            onPress={handleGeneratePlan}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Generate Plan</Text>
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {plan.error && (
            <View style={styles.errorCard}>
              <Text style={styles.errorTitle}>⚠️ Error</Text>
              <Text style={styles.errorMessage}>{plan.error}</Text>
            </View>
          )}

          {plan.plan && (
            <View style={styles.card}>
              <Text style={styles.planTitle}>Your Personalized Plan</Text>
              <Text style={styles.planContent}>{plan.plan}</Text>
            </View>
          )}

          <TouchableOpacity
            style={[styles.primaryButton, styles.secondaryButton, styles.regenerateButton]}
            onPress={handleGeneratePlan}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              Regenerate Plan
            </Text>
          </TouchableOpacity>
        </>
      )}

      {/* Cycle Info */}
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setExpandedSection(expandedSection === 'cycles' ? null : 'cycles')}
        >
          <Text style={styles.sectionTitle}>📊 Cycle Phases</Text>
          <Text style={styles.expandIcon}>{expandedSection === 'cycles' ? '−' : '+'}</Text>
        </TouchableOpacity>
        {expandedSection === 'cycles' && (
          <View style={styles.cycleContent}>
            <CyclePhaseInfo
              name="Menstrual Phase"
              days="1-5"
              color={theme.colors.menstrual}
              tips={[
                'Lower intensity workouts',
                'Focus on recovery and stretching',
                'Iron-rich foods (spinach, red meat)',
                'Magnesium supplements',
              ]}
            />
            <CyclePhaseInfo
              name="Follicular Phase"
              days="6-14"
              color={theme.colors.follicular}
              tips={[
                'High-intensity workouts',
                'Building phase - strength training',
                'Moderate carbs for energy',
                'B vitamins for hormone balance',
              ]}
            />
            <CyclePhaseInfo
              name="Ovulation"
              days="15-17"
              color={theme.colors.ovulation}
              tips={[
                'Peak performance period',
                'HIIT and cardio workouts',
                'Adequate protein intake',
                'Omega-3 fatty acids',
              ]}
            />
            <CyclePhaseInfo
              name="Luteal Phase"
              days="18-28"
              color={theme.colors.luteal}
              tips={[
                'Moderate intensity training',
                'Longer rest days',
                'Complex carbs for energy',
                'Calcium and magnesium',
              ]}
            />
          </View>
        )}
      </View>

      {/* Nutrition Tips */}
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setExpandedSection(expandedSection === 'nutrition' ? null : 'nutrition')}
        >
          <Text style={styles.sectionTitle}>🥗 Nutrition Tips</Text>
          <Text style={styles.expandIcon}>{expandedSection === 'nutrition' ? '−' : '+'}</Text>
        </TouchableOpacity>
        {expandedSection === 'nutrition' && (
          <View style={styles.nutritionContent}>
            <NutritionTip
              phase="Menstrual"
              items={['Iron-rich foods', 'Dark chocolate', 'Leafy greens', 'Red meat', 'Legumes']}
            />
            <NutritionTip
              phase="Follicular"
              items={['Whole grains', 'Lean proteins', 'Fresh vegetables', 'Fruits', 'Fish']}
            />
            <NutritionTip
              phase="Ovulation"
              items={['Protein sources', 'Eggs', 'Nuts and seeds', 'Whole grains', 'Water']}
            />
            <NutritionTip
              phase="Luteal"
              items={['Complex carbs', 'Calcium sources', 'Healthy fats', 'Magnesium foods', 'Fiber']}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const CyclePhaseInfo = ({
  name,
  days,
  color,
  tips,
}: {
  name: string;
  days: string;
  color: string;
  tips: string[];
}) => (
  <View style={[styles.phaseBox, { borderLeftColor: color }]}>
    <Text style={[styles.phaseName, { color }]}>{name}</Text>
    <Text style={styles.phaseDays}>Days {days}</Text>
    {tips.map((tip, idx) => (
      <Text key={idx} style={styles.phaseTip}>• {tip}</Text>
    ))}
  </View>
);

const NutritionTip = ({ phase, items }: { phase: string; items: string[] }) => (
  <View style={styles.nutritionBox}>
    <Text style={styles.nutritionPhase}>{phase} Phase</Text>
    <View style={styles.nutritionItems}>
      {items.map((item, idx) => (
        <View key={idx} style={styles.nutritionTag}>
          <Text style={styles.nutritionTagText}>{item}</Text>
        </View>
      ))}
    </View>
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    lineHeight: 24,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  cardDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 22,
    marginBottom: theme.spacing.lg,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  secondaryButtonText: {
    color: theme.colors.primary,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  regenerateButton: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: theme.spacing.lg,
  },
  planContent: {
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 24,
  },
  errorCard: {
    backgroundColor: '#FFE5E5',
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.danger,
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.danger,
    marginBottom: theme.spacing.sm,
  },
  errorMessage: {
    fontSize: 14,
    color: theme.colors.text,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
  },
  expandIcon: {
    fontSize: 24,
    color: theme.colors.primary,
  },
  cycleContent: {
    gap: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTopVertical: theme.spacing.md,
  },
  phaseBox: {
    borderLeftWidth: 4,
    paddingLeft: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  phaseName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: theme.spacing.xs,
  },
  phaseDays: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  phaseTip: {
    fontSize: 14,
    color: theme.colors.text,
    marginVertical: theme.spacing.xs,
  },
  nutritionContent: {
    gap: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.md,
  },
  nutritionBox: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
  },
  nutritionPhase: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  nutritionItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  nutritionTag: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },
  nutritionTagText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
});
