import { Text, View } from 'react-native';
import { colors } from '../theme/colors';

export default function StatusBadge({ status }: { status: string }) {
  const config = {
    on_time: { label: 'À l’heure', color: colors.success },
    delayed: { label: 'Retardé', color: colors.warning },
    cancelled: { label: 'Supprimé', color: colors.danger },
  }[status] || { label: status, color: colors.muted };

  return (
    <View
      style={{
        backgroundColor: config.color,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: 'flex-start',
      }}
    >
      <Text style={{ color: '#fff', fontSize: 12 }}>
        {config.label}
      </Text>
    </View>
  );
}