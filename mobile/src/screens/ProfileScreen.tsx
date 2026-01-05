import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useAppStore } from '../store';
import { theme } from '../theme';
import { UserProfile } from '../types';

export const ProfileScreen = ({ navigation }: any) => {
  const { profile, setProfile } = useAppStore();
  const [formData, setFormData] = useState<UserProfile>(
    profile || {
      age: 25,
      height_cm: 165,
      weight_cm: 70,
      goal: 'fat loss',
      workout_days: 4,
      cycle_length: 28,
      last_period_days_ago: 5,
    }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.age || formData.age < 13 || formData.age > 80) {
      newErrors.age = 'Age must be between 13 and 80';
    }
    if (formData.height_cm && (formData.height_cm < 120 || formData.height_cm > 220)) {
      newErrors.height_cm = 'Height must be between 120 and 220 cm';
    }
    if (formData.weight_cm && (formData.weight_cm < 30 || formData.weight_cm > 200)) {
      newErrors.weight_cm = 'Weight must be between 30 and 200 kg';
    }
    if (formData.cycle_length && (formData.cycle_length < 21 || formData.cycle_length > 35)) {
      newErrors.cycle_length = 'Cycle length must be between 21 and 35 days';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      setProfile(formData);
      // Show success feedback
      setTimeout(() => {
        navigation.goBack();
      }, 500);
    } catch (error) {
      setErrors({ submit: 'Failed to save profile' });
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: keyof UserProfile, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? (field === 'goal' ? value : Number(value)) : value,
    }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Profile</Text>
        <Text style={styles.subtitle}>
          Help us personalize your fitness journey
        </Text>
      </View>

      <View style={styles.form}>
        {/* Age */}
        <FormField
          label="Age *"
          placeholder="Enter your age"
          value={String(formData.age)}
          onChangeText={(value) => updateField('age', value)}
          keyboardType="number-pad"
          error={errors.age}
        />

        {/* Height */}
        <FormField
          label="Height (cm)"
          placeholder="Enter height in cm"
          value={String(formData.height_cm || '')}
          onChangeText={(value) => updateField('height_cm', value)}
          keyboardType="decimal-pad"
          error={errors.height_cm}
        />

        {/* Weight */}
        <FormField
          label="Weight (kg)"
          placeholder="Enter weight in kg"
          value={String(formData.weight_cm || '')}
          onChangeText={(value) => updateField('weight_cm', value)}
          keyboardType="decimal-pad"
          error={errors.weight_cm}
        />

        {/* Goal */}
        <FormField
          label="Fitness Goal"
          placeholder="e.g., fat loss, muscle gain, endurance"
          value={formData.goal || ''}
          onChangeText={(value) => updateField('goal', value)}
          error={errors.goal}
        />

        {/* Workout Days */}
        <FormField
          label="Workout Days per Week"
          placeholder="e.g., 4"
          value={String(formData.workout_days || '')}
          onChangeText={(value) => updateField('workout_days', value)}
          keyboardType="number-pad"
          error={errors.workout_days}
        />

        {/* Cycle Length */}
        <FormField
          label="Cycle Length (days)"
          placeholder="Average cycle length (21-35)"
          value={String(formData.cycle_length || '')}
          onChangeText={(value) => updateField('cycle_length', value)}
          keyboardType="number-pad"
          error={errors.cycle_length}
        />

        {/* Days Since Last Period */}
        <FormField
          label="Days Since Last Period"
          placeholder="Approximate days"
          value={String(formData.last_period_days_ago || '')}
          onChangeText={(value) => updateField('last_period_days_ago', value)}
          keyboardType="number-pad"
          error={errors.last_period_days_ago}
        />

        {errors.submit && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errors.submit}</Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Save Profile</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Why This Information?</Text>
        <Text style={styles.infoText}>
          Your menstrual cycle phases (menstrual, follicular, ovulation, luteal) affect your energy, strength, and nutritional needs. We use this info to create perfectly timed workout and nutrition plans.
        </Text>
      </View>
    </ScrollView>
  );
};

const FormField = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  error,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: string;
  error?: string;
}) => (
  <View style={styles.fieldGroup}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, error && styles.inputError]}
      placeholder={placeholder}
      placeholderTextColor={theme.colors.textSecondary}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType as any}
    />
    {error && <Text style={styles.fieldError}>{error}</Text>}
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
  form: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  fieldGroup: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text,
  },
  inputError: {
    borderColor: theme.colors.danger,
    backgroundColor: theme.colors.background,
  },
  fieldError: {
    fontSize: 12,
    color: theme.colors.danger,
    marginTop: theme.spacing.xs,
  },
  errorContainer: {
    backgroundColor: '#FFE5E5',
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: 14,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  infoCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.secondary,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  infoText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
});
