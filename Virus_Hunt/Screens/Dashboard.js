import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart } from 'react-native-chart-kit';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalFiles: 0,
    fileTypeCounts: {},
    dateCounts: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        console.log("Fetching stats for userId:", userId);
        const response = await fetch(`http://192.168.10.9:5000/files/${userId}`);
        const data = await response.json();
        const files = Array.isArray(data) ? data : data.files || [];

        //  
        // console.log("Fetched response:", data);
        // console.log("Extracted files:", files);


        const typeCounts = {};
        const dateCounts = {};

        files.forEach(file => {
          const type = file.type || 'unknown';
          typeCounts[type] = (typeCounts[type] || 0) + 1;

          const dateKey = new Date(file.date).toISOString().split('T')[0];
          dateCounts[dateKey] = (dateCounts[dateKey] || 0) + 1;
        });

        setStats({
          totalFiles: files.length,
          fileTypeCounts: typeCounts,
          dateCounts,
        });
      } catch (error) {
        console.error('Error fetching file stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const chartData = {
    labels: Object.keys(stats.dateCounts),
    datasets: [{ data: Object.values(stats.dateCounts) }],
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>📊 Dashboard</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#6B84DB" style={{ marginTop: 30 }} />
      ) : stats.totalFiles === 0 ? (
        <Text style={styles.info}>No files found.</Text>
      ) : (
        <>
          <Text style={styles.stat}>Total Files: {stats.totalFiles}</Text>

          {/* <Text style={styles.subtitle}>📂 File Type Counts:</Text>
          {Object.entries(stats.fileTypeCounts).map(([type, count]) => (
            <Text key={type} style={styles.text}>• {type}: {count}</Text>
          ))} */}

            <Text style={styles.subtitle}>📂 File Type Counts:</Text>

            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, styles.tableHeaderText]}>File Type</Text>
              <Text style={[styles.tableCell, styles.tableHeaderText]}>Count</Text>
            </View>

            {Object.entries(stats.fileTypeCounts).map(([type, count]) => (
              <View key={type} style={styles.tableRow}>
                <Text style={styles.tableCell}>{type}</Text>
                <Text style={styles.countCell}>{count}</Text>
              </View>
            ))}


          <Text style={styles.subtitle}>📅 Files Over Time:</Text>
          {chartData.labels.length > 0 ? (
            <BarChart
              data={chartData}
              width={Dimensions.get('window').width - 30}
              height={220}
              yAxisLabel=""
              chartConfig={{
                backgroundColor: '#1E1E1E',
                backgroundGradientFrom: '#1E1E1E',
                backgroundGradientTo: '#1E1E1E',
                decimalPlaces: 0,
                color: () => `#6B84DB`,
                labelColor: () => '#A5A9C4',
              }}
              style={styles.chart}
            />
          ) : (
            <Text style={styles.text}>No data for graph.</Text>
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top:20,
    backgroundColor: '#121212',
  },
  content: {
    //top: 30,
    padding: 20,
    paddingBottom: 60,
  },
  title: {
    marginTop: 60,
    bottom: 15,
    color: '#6B84DB',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  stat: {
    //top: 20,
    //marginTop: 60,
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#BB86FC',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    color: '#A5A9C4',
    fontSize: 16,
    marginBottom: 5,
  },
  info: {
    top:40,
    color: '#999',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  chart: {
    borderRadius: 10,
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#333',
    paddingVertical: 8,
    marginTop: 10,
  },
  
  tableHeaderText: {
    fontWeight: 'bold',
    color: '#BB86FC',
  },
  
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderColor: '#222',
  },
  
  tableCell: {
    flex: 1,
    color: '#A5A9C4',
    fontSize: 16,
  },
  countCell: {
    flex: 1,
    color: '#A5A9C4',
    fontSize: 16,
    marginLeft: 30,
  },
  
});

export default Dashboard;
