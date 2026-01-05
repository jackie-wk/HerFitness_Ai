import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';

export default function App() {
  const [profile, setProfile] = React.useState({
    age: 25,
    height_cm: 165,
    weight_cm: 70,
    goal: 'fat loss',
    workout_days: 4,
  });

  const [plan, setPlan] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOnline, setIsOnline] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const response = await fetch('http://192.168.100.49:8000/health');
      setIsOnline(response.ok);
    } catch {
      setIsOnline(false);
    }
  };

  const handleGeneratePlan = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://192.168.100.49:8000/generate_plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      const data = await response.json();
      setPlan(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>HerFitness AI</Text>
        <Text style={styles.subtitle}>Female-Focused Fitness App</Text>
      </View>

      {/* Status */}
      <View
        style={[
          styles.statusCard,
          isOnline ? styles.onlineCard : styles.offlineCard,
        ]}
      >
        <View style={styles.statusBadge}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isOnline ? '#2A9D8F' : '#E63946' },
            ]}
          />
          <Text style={styles.statusText}>
            {isOnline ? '✓ Connected' : '✗ Offline'}
          </Text>
        </View>
        {!isOnline && (
          <Text style={styles.offlineMessage}>
            Backend at 192.168.100.49:8000
          </Text>
        )}
      </View>

      {/* Profile Form */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Profile</Text>

        <FormField
          label="Age"
          value={String(profile.age)}
          onChangeText={(value) =>
            setProfile({ ...profile, age: Number(value) || 0 })
          }
        />

        <FormField
          label="Height (cm)"
          value={String(profile.height_cm)}
          onChangeText={(value) =>
            setProfile({ ...profile, height_cm: Number(value) || 0 })
          }
        />

        <FormField
          label="Weight (kg)"
          value={String(profile.weight_cm)}
          onChangeText={(value) =>
            setProfile({ ...profile, weight_cm: Number(value) || 0 })
          }
        />

        <FormField
          label="Goal"
          value={profile.goal}
          onChangeText={(value) => setProfile({ ...profile, goal: value })}
        />

        <FormField
          label="Workout Days/Week"
          value={String(profile.workout_days)}
          onChangeText={(value) =>
            setProfile({ ...profile, workout_days: Number(value) || 0 })
          }
        />
      </View>

      {/* Generate Plan Button */}
      {isOnline && (
        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleGeneratePlan}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Generate Wellness Plan</Text>
          )}
        </TouchableOpacity>
      )}

      {/* Error Message */}
      {error && (
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      )}

      {/* Plan Display */}
      {plan && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Wellness Plan</Text>
          {plan.plan && (
            <Text style={styles.planText}>{plan.plan}</Text>
          )}
          {plan.error && (
            <Text style={styles.errorText}>Error: {plan.error}</Text>
          )}
        </View>
      )}

      {/* Cycle Info */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Menstrual Cycle Phases</Text>
        <CyclePhase
          name="Menstrual"
          days="1-5"
          color="#E63946"
          tips={['Low intensity workouts', 'Iron-rich foods']}
        />
        <CyclePhase
          name="Follicular"
          days="6-14"
          color="#F77F88"
          tips={['High-intensity training', 'Build strength']}
        />
        <CyclePhase
          name="Ovulation"
          days="15-17"
          color="#F4A261"
          tips={['Peak performance', 'HIIT workouts']}
        />
        <CyclePhase
          name="Luteal"
          days="18-28"
          color="#2A9D8F"
          tips={['Steady workouts', 'Higher calories']}
        />
      </View>

      <View style={styles.spacing} />
    </ScrollView>
  );
}

const FormField = ({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}) => (
  <View style={styles.fieldGroup}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      keyboardType="default"
      placeholderTextColor="#999"
    />
  </View>
);

const CyclePhase = ({
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
      <Text key={idx} style={styles.tip}>
        • {tip}
      </Text>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  header: {
    marginBottom: 24,
    marginTop: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#E63946',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  onlineCard: {
    borderLeftColor: '#2A9D8F',
  },
  offlineCard: {
    borderLeftColor: '#E63946',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F1F1F',
  },
  offlineMessage: {
    fontSize: 12,
    color: '#757575',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F1F1F',
    marginBottom: 16,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F1F1F',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F1F1F',
  },
  button: {
    backgroundColor: '#E63946',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  errorCard: {
    backgroundColor: '#FFE5E5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#E63946',
  },
  errorText: {
    color: '#E63946',
    fontSize: 14,
  },
  planText: {
    fontSize: 14,
    color: '#1F1F1F',
    lineHeight: 24,
  },
  phaseBox: {
    borderLeftWidth: 4,
    paddingLeft: 12,
    paddingVertical: 12,
    marginBottom: 12,
  },
  phaseName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  phaseDays: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 8,
  },
  tip: {
    fontSize: 13,
    color: '#1F1F1F',
    marginVertical: 4,
  },
  spacing: {
    height: 32,
  },
});
