class DescriptiveStatistics {
    constructor(data) {
      this.data = data;
    }
  
    // Measures of Central Tendency
    mean() {
      const sum = this.data.reduce((acc, value) => acc + value, 0);
      return sum / this.data.length;
    }
  
    median() {
      const sortedData = this.data.slice().sort((a, b) => a - b);
      const middleIndex = Math.floor(sortedData.length / 2);
  
      if (sortedData.length % 2 === 0) {
        return (sortedData[middleIndex - 1] + sortedData[middleIndex]) / 2;
      } else {
        return sortedData[middleIndex];
      }
    }
  
    mode() {
      const frequencyMap = new Map();
      this.data.forEach((value) => {
        frequencyMap.set(value, (frequencyMap.get(value) || 0) + 1);
      });
  
      let mode;
      let maxFrequency = 0;
  
      for (const [value, frequency] of frequencyMap.entries()) {
        if (frequency > maxFrequency) {
          maxFrequency = frequency;
          mode = value;
        }
      }
  
      return mode;
    }
  
    // Measures of Dispersion
    range() {
      const sortedData = this.data.slice().sort((a, b) => a - b);
      return sortedData[sortedData.length - 1] - sortedData[0];
    }
  
    variance() {
      const meanValue = this.mean();
      const squaredDifferences = this.data.map((value) => Math.pow(value - meanValue, 2));
      return squaredDifferences.reduce((acc, value) => acc + value, 0) / this.data.length;
    }
  
    standardDeviation() {
      return Math.sqrt(this.variance());
    }
  
    quartiles() {
      const sortedData = this.data.slice().sort((a, b) => a - b);
      const middleIndex = Math.floor(sortedData.length / 2);
  
      const lowerHalf = sortedData.slice(0, middleIndex);
      const upperHalf = sortedData.slice(middleIndex + (sortedData.length % 2 === 0 ? 0 : 1));
  
      const lowerQ = this.median(lowerHalf);
      const upperQ = this.median(upperHalf);
  
      return { lowerQuartile: lowerQ, upperQuartile: upperQ };
    }
  
    interquartileRange() {
      const { lowerQuartile, upperQuartile } = this.quartiles();
      return upperQuartile - lowerQuartile;
    }
  }
  
  // Example usage
  const data = [4, 7, 1, 9, 2, 5, 8, 3, 6];
  const stats = new DescriptiveStatistics(data);
  
  console.log('Mean:', stats.mean());
  console.log('Median:', stats.median());
  console.log('Mode:', stats.mode());
  
  console.log('Range:', stats.range());
  console.log('Variance:', stats.variance());
  console.log('Standard Deviation:', stats.standardDeviation());
  
  const quartiles = stats.quartiles();
  console.log('Lower Quartile:', quartiles.lowerQuartile);
  console.log('Upper Quartile:', quartiles.upperQuartile);
  
  console.log('Interquartile Range:', stats.interquartileRange());
  