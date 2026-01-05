import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useAppStore } from '../store';
import { theme } from '../theme';
import { healthCheck } from '../api';

export const HomeScreen = ({ navigation }: any) => {
  const { profile } = useAppStore();
  const [isOnline, setIsOnline] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkBackend();
  }, []);

  const checkBackend = async () => {
    try {
      const online = await healthCheck();
      setIsOnline(online);
    } catch {
      setIsOnline(false);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>HerFitness</Text>
        <Text style={styles.subtitle}>
          Personalized fitness for your cycle
        </Text>
      </View>

      {/* Status Card */}
      <View style={[styles.card, isOnline ? styles.onlineCard : styles.offlineCard]}>
        <View style={styles.statusBadge}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isOnline ? theme.colors.success : theme.colors.danger },
            ]}
          />
          <Text style={styles.statusText}>
            {isOnline ? 'Connected' : 'Offline'}
          </Text>
        </View>
        {!isOnline && (
          <Text style={styles.offlineMessage}>
            Make sure your backend is running on your network
          </Text>
        )}
      </View>

      {/* Profile Section */}
      {profile ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Profile</Text>
          <View style={styles.profileGrid}>
            <View style={styles.profileItem}>
              <Text style={styles.profileLabel}>Age</Text>
              <Text style={styles.profileValue}>{profile.age}</Text>
            </View>
            {profile.height_cm && (
              <View style={styles.profileItem}>
                <Text style={styles.profileLabel}>Height</Text>
                <Text style={styles.profileValue}>{profile.height_cm} cm</Text>
              </View>
            )}
            {profile.weight_cm && (
              <View style={styles.profileItem}>
                <Text style={styles.profileLabel}>Weight</Text>
                <Text style={styles.profileValue}>{profile.weight_cm} kg</Text>
              </View>
            )}
            {profile.goal && (
              <View style={styles.profileItem}>
                <Text style={styles.profileLabel}>Goal</Text>
                <Text style={styles.profileValue}>{profile.goal}</Text>
              </View>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Welcome!</Text>
          <Text style={styles.cardDescription}>
            Let's get you started by creating your profile. Our AI will personalize your fitness plan based on your menstrual cycle.
          </Text>
        </View>
      )}

      {/* Quick Actions */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Get Started</Text>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.buttonText}>
            {profile ? 'Update Profile' : 'Create Profile'}
          </Text>
        </TouchableOpacity>
        {profile && isOnline && (
          <TouchableOpacity
            style={[styles.primaryButton, styles.secondaryButton]}
            onPress={() => navigation.navigate('Plan')}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              Generate Wellness Plan
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Features */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Features</Text>
        <View style={styles.featureList}>
          <FeatureItem title="🔄 Cycle Tracking" description="Track your menstrual cycle phases" />
          <FeatureItem title="💪 Smart Workouts" description="AI-powered exercises for your cycle phase" />
          <FeatureItem title="🥗 Nutrition Plans" description="Diet recommendations based on your cycle" />
          <FeatureItem title="💊 Supplement Guide" description="Optimal supplements for each phase" />
        </View>
      </View>
    </ScrollView>
  );
};

const FeatureItem = ({ title, description }: { title: string; description: string }) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureTitle}>{title}</Text>
    <Text style={styles.featureDescription}>{description}</Text>
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
    marginTop: theme.spacing.lg,
  },
  title: {
    fontSize: 36,
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
  onlineCard: {
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.success,
  },
  offlineCard: {
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.danger,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: theme.spacing.md,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
  },
  offlineMessage: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.md,
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
  },
  profileGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  profileItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
  },
  profileLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontWeight: '500',
    marginBottom: theme.spacing.xs,
  },
  profileValue: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
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
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  featureList: {
    gap: theme.spacing.md,
  },
  featureItem: {
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  featureDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
});
