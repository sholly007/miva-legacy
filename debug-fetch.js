const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fddixhcyckmkjfwlsuyx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkZGl4aGN5Y2tta2pmd2xzdXl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3NDEyMzgsImV4cCI6MjA5NjMxNzIzOH0.0LOw__CRsSwTFLkuo604ai8cx9nQDDEkeQUR29Lp80k';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function debugFetch() {
  console.log('Fetching all students...');
  
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .limit(10);
  
  if (error) {
    console.error('Error fetching students:', error);
  } else {
    console.log('Number of students:', data.length);
    data.forEach((student, index) => {
      console.log(`\nStudent ${index + 1}:`);
      console.log('  Program:', student.program);
      console.log('  Degree Level (if exists):', student.degree_level);
    });
  }
}

debugFetch();
