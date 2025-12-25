import { useState, useEffect } from 'react';
import { 
  Timer, Dumbbell, Target, ChevronDown, ChevronUp, 
  Languages, Home, Calendar, List, ArrowLeftRight,
  Flame, Leaf, Utensils, AlertTriangle, BookOpen,
  Sun, Droplet, Brain, Activity, Zap, Play, Pause,
  RefreshCw, CheckCircle, Info, Coffee, Moon
} from 'lucide-react';

// Workout data structure with bilingual content
export const workoutData = {
  goals: [
    {
      id: 'bulking',
      title: { en: 'Bulking', ar: 'التضخيم العضلي' },
      desc: { 
        en: 'Progressive overload with 48h rest between muscle groups. Caloric surplus +300-500kcal.',
        ar: 'زيادة الحمل التدريجي مع راحة 48 ساعة بين مجموعات العضلات. فائض سعرات حرارية +300-500 سعرة.'
      },
      plan: {
        en: '4-day split: Chest/Triceps, Back/Biceps, Legs, Shoulders/Traps',
        ar: 'برنامج 4 أيام: صدر/ثلاثية الرؤوس، ظهر/ثنائية الرؤوس، أرجل، كتفين/ترابيس'
      },
      exercises: [
        { name: { en: 'Bench Press', ar: 'الضغط المسطح' }, sets: 4, reps: '8-10', rest: 120 },
        { name: { en: 'Squats', ar: 'القرفصاء' }, sets: 4, reps: '8-10', rest: 150 },
        { name: { en: 'Pull-ups', ar: 'الشد لأعلى' }, sets: 3, reps: 'Max', rest: 120 },
        { name: { en: 'Overhead Press', ar: 'الضغط من فوق الرأس' }, sets: 3, reps: '10-12', rest: 90 },
        { name: { en: 'Deadlifts', ar: 'الرفعة المميتة' }, sets: 3, reps: '6-8', rest: 180 },
        { name: { en: 'Barbell Rows', ar: 'الشد بالبار' }, sets: 3, reps: '10', rest: 90 }
      ]
    },
    {
      id: 'cutting',
      title: { en: 'Cutting', ar: 'التجفيف' },
      desc: { 
        en: 'High protein intake (2.2g/kg), moderate deficit. Focus on compound movements.',
        ar: 'تناول بروتين عالي (2.2غ/كلغ وزن)، عجز معتدل. التركيز على التمارين المركبة.'
      },
      plan: {
        en: '5-day split with cardio sessions. Protein focus: 40% calories',
        ar: 'برنامج 5 أيام مع جلسات كارديو. التركيز على البروتين: 40% من السعرات'
      },
      exercises: [
        { name: { en: 'Incline Dumbbell Press', ar: 'الضغط بالدمبلز على مقعد مائل' }, sets: 3, reps: '12-15', rest: 60 },
        { name: { en: 'Romanian Deadlifts', ar: 'الرفعة الرومانية' }, sets: 3, reps: '15', rest: 60 },
        { name: { en: 'Lat Pulldowns', ar: 'شد العقلة للأسفل' }, sets: 4, reps: '15', rest: 45 },
        { name: { en: 'Leg Press', ar: 'ضغط الساق' }, sets: 3, reps: '20', rest: 60 },
        { name: { en: 'Triceps Pushdown', ar: 'دفع ثلاثية الرؤوس' }, sets: 3, reps: '15-20', rest: 45 },
        { name: { en: 'Face Pulls', ar: 'شد الوجه' }, sets: 3, reps: '20', rest: 45 }
      ]
    },
    {
      id: 'queenShape',
      title: { en: 'Queen Shape', ar: 'القوام الملكي' },
      desc: { 
        en: 'Glute-focused training 2x/week. Hip thrusts, RDLs, and lateral movements.',
        ar: 'تمارين مركزة على الألوية مرتين أسبوعياً. رفع الحوض، رومانيان ديدليفت، وحركات جانبية.'
      },
      plan: {
        en: 'Glute activation daily + 2 heavy sessions weekly',
        ar: 'تنشيط الألوية يومياً + جلستين مكثفتين أسبوعياً'
      },
      exercises: [
        { name: { en: 'Hip Thrusts', ar: 'رفع الحوض' }, sets: 4, reps: '12', rest: 90 },
        { name: { en: 'Bulgarian Split Squats', ar: 'القرفصاء البلغارية' }, sets: 3, reps: '10 per leg', rest: 90 },
        { name: { en: 'Lateral Band Walks', ar: 'المشي الجانبي بالرباط' }, sets: 3, reps: '15 steps each way', rest: 60 },
        { name: { en: 'Glute Bridges', ar: 'جسور الألوية' }, sets: 3, reps: '20', rest: 60 },
        { name: { en: 'Cable Pull Throughs', ar: 'سحب الكابل بين الساقين' }, sets: 3, reps: '15', rest: 60 },
        { name: { en: 'Seated Abductions', ar: 'فتح الساقين جالساً' }, sets: 4, reps: '20', rest: 45 }
      ]
    },
    {
      id: 'fatBurn',
      title: { en: 'Fat Burn', ar: 'حرق الدهون' },
      desc: { 
        en: 'HIIT 2x/week + steady state cardio. NEAT optimization throughout the day.',
        ar: 'تمارين عالية الكثافة مرتين أسبوعياً + كارديو ثابت. تحسين النشاط اليومي.'
      },
      plan: {
        en: 'Morning fasted cardio + evening strength training',
        ar: 'كارديو صباحاً على معدة فارغة + تدريب قوة مساءً'
      },
      exercises: [
        { name: { en: 'Burpees', ar: 'الوثب القرفصاء' }, sets: 4, reps: '30s on/30s off', rest: 0 },
        { name: { en: 'Mountain Climbers', ar: 'متسلقي الجبل' }, sets: 3, reps: '45s on/15s off', rest: 0 },
        { name: { en: 'Jump Rope', ar: 'القفز بالحبل' }, sets: 5, reps: '1 min on/30s off', rest: 0 },
        { name: { en: 'Battle Ropes', ar: 'حبال المعركة' }, sets: 3, reps: '20s on/40s off', rest: 0 },
        { name: { en: 'Kettlebell Swings', ar: 'تأرجح الكيتل بل' }, sets: 4, reps: '20', rest: 30 },
        { name: { en: 'Sprint Intervals', ar: 'فترات الجري السريع' }, sets: 6, reps: '30s sprint/90s walk', rest: 0 }
      ]
    },
    {
      id: 'strength',
      title: { en: 'Strength Building', ar: 'بناء القوة' },
      desc: { 
        en: 'Low reps, high weight. Focus on compound lift with long rest periods.',
        ar: 'تكرارات منخفضة، أوزان عالية. التركيز على التمارين المركبة مع فترات راحة طويلة.'
      },
      plan: {
        en: '3-day split: Push, Pull, Legs. Heavy singles and doubles weekly.',
        ar: 'برنامج 3 أيام: دفع، سحب، أرجل. رفعات ثقيلة بمجموعات من 1-2 تكرار أسبوعياً.'
      },
      exercises: [
        { name: { en: 'Squat', ar: 'القرفصاء' }, sets: 5, reps: '3-5', rest: 180 },
        { name: { en: 'Bench Press', ar: 'الضغط المسطح' }, sets: 5, reps: '3-5', rest: 180 },
        { name: { en: 'Deadlift', ar: 'الرفعة المميتة' }, sets: 3, reps: '1-3', rest: 240 },
        { name: { en: 'Overhead Press', ar: 'الضغط من فوق الرأس' }, sets: 4, reps: '4-6', rest: 150 },
        { name: { en: 'Weighted Pull-ups', ar: 'شد لأعلى مع أوزان' }, sets: 4, reps: '4-6', rest: 150 },
        { name: { en: 'Front Squats', ar: 'القرفصاء الأمامية' }, sets: 4, reps: '5-6', rest: 180 }
      ]
    },
    {
      id: 'endurance',
      title: { en: 'Muscular Endurance', ar: 'تحمل العضلات' },
      desc: { 
        en: 'High reps, moderate weight. Minimal rest periods for metabolic stress.',
        ar: 'تكرارات عالية، أوزان معتدلة. فترات راحة قصيرة للضغط الأيضي.'
      },
      plan: {
        en: 'Full body circuit training 3x/week. 45-second rest between exercises.',
        ar: 'تمارين دائرية للجسم الكامل 3 مرات أسبوعياً. راحة 45 ثانية بين التمارين.'
      },
      exercises: [
        { name: { en: 'Push-up Circuit', ar: 'دورة تمارين الضغط' }, sets: 1, reps: '100 total', rest: 0 },
        { name: { en: 'Bodyweight Squat Blasters', ar: 'قرفصاء بدون أوزان سريعة' }, sets: 1, reps: '150 total', rest: 0 },
        { name: { en: 'Plank Complex', ar: 'مجمع اللوح الخشبي' }, sets: 5, reps: '60s hold', rest: 15 },
        { name: { en: 'Lunge Matrix', ar: 'مصفوفة الخطوات الأمامية' }, sets: 1, reps: '80 total', rest: 0 },
        { name: { en: 'Dips Circuit', ar: 'دورة الغطس' }, sets: 4, reps: '20', rest: 30 },
        { name: { en: 'Mountain Climber Sprints', ar: 'سباق متسلقي الجبل' }, sets: 3, reps: '60s', rest: 30 }
      ]
    }
  ],
  
  levels: [
    {
      id: 'beginner',
      title: { en: 'Beginner', ar: 'مبتدئ' },
      desc: { 
        en: 'Master form with light weights. Full body routines 3x/week.',
        ar: 'إتقان الشكل بأوزان خفيفة. روتين كامل للجسم 3 مرات أسبوعياً.'
      },
      plan: {
        en: '3 sets x 10-12 reps. Rest: 90s between sets',
        ar: '3 مجموعات × 10-12 تكرار. راحة: 90 ثانية بين المجموعات'
      },
      warmup: {
        en: '5 min light cardio + dynamic stretching (arm circles, leg swings)',
        ar: '5 دقائق كارديو خفيف + إطالة ديناميكية (تحريك الذراعين، تأرجح الساقين)'
      }
    },
    {
      id: 'intermediate',
      title: { en: 'Intermediate', ar: 'متوسط' },
      desc: { 
        en: 'Upper/lower split 4x/week. Progressive overload tracking.',
        ar: 'تقسيم علوي/سفلي 4 مرات أسبوعياً. تتبع الزيادة التدريجية.'
      },
      plan: {
        en: '4 sets x 8-10 reps. Rest: 75s between sets',
        ar: '4 مجموعات × 8-10 تكرارات. راحة: 75 ثانية بين المجموعات'
      },
      warmup: {
        en: '7 min cardio + activation set (50% working weight) + mobility drills',
        ar: '7 دقائق كارديو + مجموعات تنشيط (50% من وزن التمرين) + تمارين مرونة'
      }
    },
    {
      id: 'advanced',
      title: { en: 'Advanced', ar: 'متقدم' },
      desc: { 
        en: 'Push/pull/legs split. Periodization blocks. Advanced techniques.',
        ar: 'تقسيم دفع/شد/أرجل. كتل تدريبية دورية. تقنيات متقدمة.'
      },
      plan: {
        en: '5 sets x 6-8 reps. Rest: 60s between sets',
        ar: '5 مجموعات × 6-8 تكرارات. راحة: 60 ثانية بين المجموعات'
      },
      warmup: {
        en: '10 min zone 2 cardio + specific mobility work + ramp-up sets',
        ar: '10 دقائق كارديو في المنطقة الثانية + تمارين مرونة محددة + مجموعات تصاعدية'
      }
    },
    {
      id: 'mature',
      title: { en: 'Mature Athlete', ar: 'رياضي ناضج' },
      desc: { 
        en: 'Emphasize controlled movements. Higher reps (12-15). Prioritize recovery.',
        ar: 'التركيز على الحركات المسيطر عليها. تكرارات أعلى (12-15). أولوية للتعافي.'
      },
      plan: {
        en: '3 sets x 12-15 reps. Rest: 120s between sets',
        ar: '3 مجموعات × 12-15 تكرار. راحة: 120 ثانية بين المجموعات'
      },
      warmup: {
        en: '12 min low-impact cardio + foam rolling + thorough dynamic stretching',
        ar: '12 دقيقة كارديو منخفض التأثير + التدليك بالاسفنج + إطالة ديناميكية شاملة'
      }
    }
  ],
  
  fullWeekPlans: {
    bulking: [
      {
        day: { en: 'Monday - Chest/Triceps', ar: 'الاثنين - الصدر/ثلاثية الرؤوس' },
        exercises: [
          { 
            name: { en: 'Bench Press', ar: 'الضغط المسطح' },
            sets: 4, reps: '8-10', rest: 120,
            desc: { 
              en: 'Focus on chest contraction at the top position',
              ar: 'التركيز على انقباض الصدر في الوضعية العليا'
            },
            warmup: {
              en: '2 sets of 10-12 reps at 50% working weight',
              ar: 'مجموعتان من 10-12 تكرار بـ50% من وزن التمرين'
            }
          },
          { 
            name: { en: 'Incline Dumbbell Press', ar: 'الضغط بالدمبلز على مقعد مائل' },
            sets: 3, reps: '10-12', rest: 90,
            desc: { 
              en: 'Keep shoulders down and back throughout movement',
              ar: 'حافظ على الكتفين مائلتين للأسفل والخلف خلال التمرين'
            },
            warmup: {
              en: '1 set of 12 reps with light weight',
              ar: 'مجموعة واحدة 12 تكرار بوزن خفيف'
            }
          },
          { 
            name: { en: 'Triceps Pushdown', ar: 'دفع ثلاثية الرؤوس' },
            sets: 3, reps: '12-15', rest: 60,
            desc: { 
              en: 'Elbows pinned to sides, only forearms move',
              ar: 'ثني المرفقين بجانب الجسم، تحريك الساعدين فقط'
            },
            warmup: {
              en: '1 set of 15 reps with light weight',
              ar: 'مجموعة واحدة 15 تكرار بوزن خفيف'
            }
          }
        ]
      },
      {
        day: { en: 'Tuesday - Back/Biceps', ar: 'الثلاثاء - الظهر/ثنائية الرؤوس' },
        exercises: [
          { 
            name: { en: 'Pull-ups', ar: 'الشد لأعلى' },
            sets: 4, reps: 'Max', rest: 120,
            desc: { 
              en: 'Full range of motion, chest to bar',
              ar: 'مدى حركة كامل، الصدر إلى الشريط'
            },
            warmup: {
              en: '2 sets of 5-8 reps with assistance if needed',
              ar: 'مجموعتان 5-8 تكرار بمساندة إذا لزم الأمر'
            }
          },
          { 
            name: { en: 'Bent-over Rows', ar: 'الشد المائل' },
            sets: 3, reps: '10', rest: 90,
            desc: { 
              en: 'Keep back straight, pull to lower abdomen',
              ar: 'الحفاظ على الظهر مستقيماً، السحب إلى أسفل البطن'
            },
            warmup: {
              en: '2 sets of 10 reps with 50% working weight',
              ar: 'مجموعتان 10 تكرار بـ50% من وزن التمرين'
            }
          },
          { 
            name: { en: 'Hammer Curls', ar: 'تمارين الهامر' },
            sets: 3, reps: '12', rest: 60,
            desc: { 
              en: 'Palms facing each other, controlled movement',
              ar: 'الكفوف مواجهة لبعضها، حركة محكمة'
            },
            warmup: {
              en: '1 set of 15 reps with light dumbbells',
              ar: 'مجموعة واحدة 15 تكرار بدمبيلز خفيفة'
            }
          }
        ]
      },
      {
        day: { en: 'Wednesday - Legs', ar: 'الأربعاء - الأرجل' },
        exercises: [
          { 
            name: { en: 'Barbell Squat', ar: 'القرفصاء بالبار' },
            sets: 4, reps: '8-10', rest: 150,
            desc: { 
              en: 'Feet shoulder-width apart, descend until thighs parallel to floor',
              ar: 'القدمين بعرض الكتفين، الهبوط حتى تكون الفخذين موازية للأرض'
            },
            warmup: {
              en: '3 ramp-up sets: 12 reps empty bar, 8 reps @30%, 5 reps @50% working weight',
              ar: '3 مجموعات تصاعدية: 12 تكرار بدون وزن، 8 تكرار بـ30%، 5 تكرار بـ50% من وزن التمرين'
            }
          },
          { 
            name: { en: 'Romanian Deadlifts', ar: 'الرفعة الرومانية' },
            sets: 3, reps: '10-12', rest: 120,
            desc: { 
              en: 'Slight knee bend, focus on hamstring stretch',
              ar: 'ثني خفيف في الركبة، التركيز على شد أوتار الركبة'
            },
            warmup: {
              en: '2 sets of 12 reps with light weight',
              ar: 'مجموعتان 12 تكرار بوزن خفيف'
            }
          },
          { 
            name: { en: 'Leg Press', ar: 'ضغط الساق' },
            sets: 3, reps: '12-15', rest: 90,
            desc: { 
              en: 'Feet low and close for quads emphasis',
              ar: 'القدمين منخفضتين وقريبتين للتركيز على عضلات الفخذ الأمامية'
            },
            warmup: {
              en: '2 sets of 15 reps with 40% working weight',
              ar: 'مجموعتان 15 تكرار بـ40% من وزن التمرين'
            }
          }
        ]
      },
      {
        day: { en: 'Thursday - Shoulders/Traps', ar: 'الخميس - الكتفين/الترابيس' },
        exercises: [
          { 
            name: { en: 'Overhead Press', ar: 'الضغط من فوق الرأس' },
            sets: 4, reps: '8-10', rest: 120,
            desc: { 
              en: 'Bar path should clear chin, lockout overhead',
              ar: 'مسار البار يجب أن يتجاوز الذقن، قفل في الأعلى'
            },
            warmup: {
              en: '3 ramp-up sets: 10, 8, 6 reps with increasing weight',
              ar: '3 مجموعات تصاعدية: 10، 8، 6 تكرار بزيادة الوزن'
            }
          },
          { 
            name: { en: 'Lateral Raises', ar: 'رفع الجانبي' },
            sets: 3, reps: '15-20', rest: 60,
            desc: { 
              en: 'Slight bend in elbows, raise to shoulder height',
              ar: 'ثني خفيف في المرفقين، الرفع حتى مستوى الكتف'
            },
            warmup: {
              en: '1 set of 20 reps with very light weight',
              ar: 'مجموعة واحدة 20 تكرار بوزن خفيف جداً'
            }
          },
          { 
            name: { en: 'Shrugs', ar: 'تمارين الرفع' },
            sets: 3, reps: '12-15', rest: 60,
            desc: { 
              en: 'Full range motion, squeeze traps at top',
              ar: 'مدى حركة كامل، شد العضلات في الأعلى'
            },
            warmup: {
              en: '1 set of 15 reps with light weight',
              ar: 'مجموعة واحدة 15 تكرار بوزن خفيف'
            }
          }
        ]
      },
      {
        day: { en: 'Friday - Arms/Abs', ar: 'الجمعة - الذراعين/البطن' },
        exercises: [
          { 
            name: { en: 'Close-grip Bench Press', ar: 'الضغط بمسافة يدين ضيقة' },
            sets: 3, reps: '10-12', rest: 90,
            desc: { 
              en: 'Hands shoulder-width apart for triceps emphasis',
              ar: 'اليدين بعرض الكتفين للتركيز على ثلاثية الرؤوس'
            },
            warmup: {
              en: '2 sets of 10 reps with 50% working weight',
              ar: 'مجموعتان 10 تكرار بـ50% من وزن التمرين'
            }
          },
          { 
            name: { en: 'Preacher Curls', ar: 'تمارين الذراع على مقعد' },
            sets: 3, reps: '10-12', rest: 60,
            desc: { 
              en: 'Full stretch at bottom, squeeze at top',
              ar: 'تمدد كامل في الأسفل، شد في الأعلى'
            },
            warmup: {
              en: '1 set of 12 reps with light weight',
              ar: 'مجموعة واحدة 12 تكرار بوزن خفيف'
            }
          },
          { 
            name: { en: 'Hanging Leg Raises', ar: 'رفع الساقين المعلقة' },
            sets: 3, reps: '15', rest: 60,
            desc: { 
              en: 'No swing, lift knees to chest with control',
              ar: 'بدون تحريك، رفع الركبتين إلى الصدر بتحكم'
            },
            warmup: {
              en: '2 sets of 10 reps with bent knees',
              ar: 'مجموعتان 10 تكرار مع ثني الركبتين'
            }
          }
        ]
      },
      {
        day: { en: 'Saturday - Cardio/Recovery', ar: 'السبت - كارديو/تعافي' },
        exercises: [
          { 
            name: { en: 'Steady State Cardio', ar: 'كارديو ثابت' },
            sets: 1, reps: '30-45 minutes', rest: 0,
            desc: { 
              en: 'Maintain 60-70% max heart rate throughout',
              ar: 'المحافظة على 60-70% من أقصى معدل ضربات القلب طوال الوقت'
            },
            warmup: {
              en: '5 minutes easy pace before starting',
              ar: '5 دقائق بخطى سهلة قبل البدء'
            }
          },
          { 
            name: { en: 'Foam Rolling', ar: 'التدليك بالاسفنج' },
            sets: 1, reps: '10 minutes', rest: 0,
            desc: { 
              en: 'Focus on quads, hamstrings, glute, back, and chest',
              ar: 'التركيز على عضلات الفخذ الأمامية، أوتار الركبة، الألوية، الظهر، والصدر'
            },
            warmup: {
              en: 'None required',
              ar: 'غير مطلوب'
            }
          }
        ]
      },
      {
        day: { en: 'Sunday - Rest', ar: 'الأحد - راحة' },
        exercises: [
          { 
            name: { en: 'Active Recovery', ar: 'تعافي نشط' },
            sets: 1, reps: 'Light activity or complete rest', rest: 0,
            desc: { 
              en: 'Prioritize sleep and hydration for muscle repair',
              ar: 'إعطاء الأولوية للنوم والترطيب لإصلاح العضلات'
            },
            warmup: {
              en: 'None required',
              ar: 'غير مطلوب'
            }
          }
        ]
      }
    ],
    
    cutting: [
      {
        day: { en: 'Monday - Chest/Triceps/HIIT', ar: 'الاثنين - الصدر/ثلاثية الرؤوس/HIIT' },
        exercises: [
          { 
            name: { en: 'Incline Dumbbell Press', ar: 'الضغط بالدمبلز على مقعد مائل' },
            sets: 3, reps: '12-15', rest: 60,
            desc: { 
              en: 'Controlled eccentric phase for maximum time under tension',
              ar: 'المرحلة السلبية مضبوطة لأقصى وقت تحت التوتر'
            },
            warmup: {
              en: '2 sets of 15 reps with light weight',
              ar: 'مجموعتان 15 تكرار بوزن خفيف'
            }
          },
          { 
            name: { en: 'Cable Flye', ar: 'تمارين الصدر بالكابل' },
            sets: 3, reps: '15-20', rest: 45,
            desc: { 
              en: 'Slight bend in elbows, squeeze chest at peak contraction',
              ar: 'ثني خفيف في المرفقين، شد الصدر في انقباض الذروة'
            },
            warmup: {
              en: '1 set of 20 reps with very light weight',
              ar: 'مجموعة واحدة 20 تكرار بوزن خفيف جداً'
            }
          },
          { 
            name: { en: 'Overhead Triceps Extension', ar: 'تمديد ثلاثية الرؤوس من فوق الرأس' },
            sets: 3, reps: '15', rest: 45,
            desc: { 
              en: 'Keep elbows in fixed position, only forearms move',
              ar: 'إبقاء المرفقين في مكان ثابت، تحريك الساعدين فقط'
            },
            warmup: {
              en: '1 set of 15 reps with light weight',
              ar: 'مجموعة واحدة 15 تكرار بوزن خفيف'
            }
          },
          { 
            name: { en: 'HIIT Sprints', ar: 'سباقات عالية الكثافة' },
            sets: 8, reps: '20s sprint/40s rest', rest: 0,
            desc: { 
              en: 'All-out effort during sprint intervals',
              ar: 'جهد كامل خلال فترات السباق'
            },
            warmup: {
              en: '5 minutes light jogging before starting',
              ar: '5 دقائق ركض خفيف قبل البدء'
            }
          }
        ]
      }
    ],
    
    homeWorkout: [
      {
        day: { en: 'Full Body Home Routine', ar: 'روتين كامل للجسم في المنزل' },
        exercises: [
          { 
            name: { en: 'Push-ups', ar: 'تمارين الضغط' },
            sets: 4, reps: 'Max', rest: 60,
            desc: { 
              en: 'Keep body straight from head to heels',
              ar: 'حافظ على جسمك مستقيماً من الرأس إلى الكعبين'
            },
            warmup: {
              en: '2 sets of 10-15 reps with knees on ground if needed',
              ar: 'مجموعتان 10-15 تكرار مع وضع الركبتين على الأرض إذا لزم الأمر'
            }
          },
          { 
            name: { en: 'Chair Dips', ar: 'الغطس على الكرسي' },
            sets: 3, reps: '12-15', rest: 45,
            desc: { 
              en: 'Use sturdy chair, lower slowly',
              ar: 'استخدم كرسياً ثابتاً، انزل ببطء'
            },
            warmup: {
              en: '1 set of 10 reps with partial range of motion',
              ar: 'مجموعة واحدة 10 تكرار بمدى حركة جزئي'
            }
          },
          { 
            name: { en: 'Bodyweight Squats', ar: 'القرفصاء بدون أوزان' },
            sets: 4, reps: '20', rest: 60,
            desc: { 
              en: 'Feet shoulder-width apart, chest up',
              ar: 'القدمين بعرض الكتفين، الصدر مرفوع'
            },
            warmup: {
              en: '2 sets of 15 reps at slow tempo',
              ar: 'مجموعتان 15 تكرار بإيقاع بطيء'
            }
          },
          { 
            name: { en: 'Plank', ar: 'اللوح الخشبي' },
            sets: 3, reps: '45s hold', rest: 30,
            desc: { 
              en: 'Engage core, don\'t let hips sag',
              ar: 'شغّل عضلات البطن، لا تدع الوركين ينزلان'
            },
            warmup: {
              en: '1 set of 20s hold',
              ar: 'مجموعة واحدة 20 ثانية ثبات'
            }
          },
          { 
            name: { en: 'Lunges', ar: 'الخطوات الأمامية' },
            sets: 3, reps: '15 per leg', rest: 45,
            desc: { 
              en: 'Front knee at 90 degrees, don\'t let it go past toes',
              ar: 'الركبة الأمامية عند 90 درجة، لا تدعها تتعدى أصابع القدم'
            },
            warmup: {
              en: '1 set of 10 per leg with no weight',
              ar: 'مجموعة واحدة 10 لكل ساق بدون وزن'
            }
          },
          { 
            name: { en: 'Superman', ar: 'تمرين السوبرمان' },
            sets: 3, reps: '15', rest: 30,
            desc: { 
              en: 'Lift chest and legs off ground simultaneously',
              ar: 'رفع الصدر والساقين عن الأرض في نفس الوقت'
            },
            warmup: {
              en: '1 set of 10 reps with partial range',
              ar: 'مجموعة واحدة 10 تكرار بمدى حركة جزئي'
            }
          }
        ]
      }
    ]
  },
  
  warmupRoutines: {
    general: [
      {
        title: { en: 'General Warm-up (5-10 minutes)', ar: 'إحماء عام (5-10 دقائق)' },
        steps: [
          { 
            en: 'Light cardio: jogging in place, jumping jacks, or brisk walking', 
            ar: 'كارديو خفيف: الركض في المكان، القفز مع فتح الذراعين والساقين، أو المشي السريع'
          },
          { 
            en: 'Dynamic stretching: arm circles, leg swings, torso twists', 
            ar: 'إطالة ديناميكية: تحريك الذراعين في دوائر، تأرجح الساقين، لف الجذع'
          },
          { 
            en: 'Joint mobility: ankle circles, wrist rotations, neck rolls', 
            ar: 'مرونة المفاصل: تحريك الكاحلين في دوائر، تدوير المعصم، تحريك الرقبة'
          },
          { 
            en: 'Sport-specific movements at 50% intensity', 
            ar: 'حركات خاصة بالرياضة بنسبة 50% من الشدة'
          }
        ]
      }
    ],
    strength: [
      {
        title: { en: 'Strength Training Warm-up (10-15 minutes)', ar: 'إحماء تدريب القوة (10-15 دقائق)' },
        steps: [
          { 
            en: '5 minutes light cardio to increase core temperature', 
            ar: '5 دقائق كارديو خفيف لزيادة درجة حرارة الجسم الأساسية'
          },
          { 
            en: 'Foam rolling of major muscle groups (quads, hamstrings, glute, back)', 
            ar: 'التدليك بالاسفنج لمجموعات العضلات الرئيسية (الفخذ الأمامي، أوتار الركبة، الألوية، الظهر)'
          },
          { 
            en: 'Activation exercise: glute bridges, band walks, plank holds', 
            ar: 'تمارين التنشيط: جسور الألوية، المشي بالرباط، ثبات اللوح الخشبي'
          },
          { 
            en: 'Ramp-up set for first compound exercise (start light, gradually increase weight)', 
            ar: 'مجموعات تصاعدية للتمرين المركب الأول (البدء بوزن خفيف، ثم زيادة الوزن تدريجياً)'
          }
        ]
      }
    ]
  },
  
  nutrition: {
    preWorkout: [
      {
        title: { en: 'Pre-Workout Nutrition (1-2 hours before)', ar: 'التغذية قبل التمرين (1-2 ساعة قبل)' },
        items: [
          { 
            en: 'Complex carbohydrates: oats, brown rice, sweet potatoes', 
            ar: 'كربوهيدرات معقدة: الشوفان، الأرز البني، البطاطا الحلوة'
          },
          { 
            en: 'Lean protein: chicken breast, fish, whey protein', 
            ar: 'بروتين قليل الدهون: صدر الدجاج، السمك، بروتين مصل اللبن'
          },
          { 
            en: 'Small amount of healthy fats: nuts, avocado (avoid large amounts)', 
            ar: 'كمية صغيرة من الدهون الصحية: المكسرات، الأفوكادو (تجنب الكميات الكبيرة)'
          },
          { 
            en: 'Hydration: 16-20 oz water with electrolytes if needed', 
            ar: 'الترطيب: 16-20 أوقية ماء مع إلكتروليتات إذا لزم الأمر'
          }
        ]
      },
      {
        title: { en: 'Quick Pre-Workout (30 minutes before)', ar: 'وجبة سريعة قبل التمرين (30 دقيقة قبل)' },
        items: [
          { 
            en: 'Simple carbohydrates for quick energy: banana, apple, dates', 
            ar: 'كربوهيدرات بسيطة للطاقة السريعة: موز، تفاح， تمر'
          },
          { 
            en: 'Small protein portion: protein shake, Greek yogurt', 
            ar: 'جزء بروتين صغير: مشروب بروتين، لبن زبادي يوناني'
          },
          { 
            en: 'Caffeine (optional): 100-200mg if tolerated', 
            ar: 'الكافيين (اختياري): 100-200 مليغرام إذا تم تحمله'
          }
        ]
      }
    ],
    postWorkout: [
      {
        title: { en: 'Post-Workout Nutrition (within 45 minutes)', ar: 'التغذية بعد التمرين (في غضون 45 دقيقة)' },
        items: [
          { 
            en: 'Fast-absorbing protein: whey protein, lean chicken, fish', 
            ar: 'بروتين سريع الامتصاص: بروتين مصل اللبن، دجاج خالي من RTL، سمك'
          },
          { 
            en: 'High glycemic index carbs to replenish glycogen: white rice, potatoes, dextrose', 
            ar: 'كربوهيدرات عالية المؤشر الجلايسيمي لإعادة ملء الجلايكوجين: الأرز الأبيض، البطاطس، دكستروز'
          },
          { 
            en: 'Electrolytes: coconut water, sports drink, or electrolyte supplement', 
            ar: 'الإلكتروليتات: ماء جوز الهند، مشروب رياضي، أو مكمل إلكتروليتات'
          },
          { 
            en: 'Anti-inflammatory foods: berries, leafy greens, turmeric', 
            ar: 'أطعمة مضادة للالتهاب: التوت، الخضروات الورقية، الكركم'
          }
        ]
      }
    ]
  },
  
  fasting: [
    {
      title: { en: 'Training During Fasting', ar: 'التمرين أثناء الصيام' },
      content: {
        en: 'Training in a fasted state can enhance fat burning through increased lipolysis and growth hormone secretion. However, for sessions longer than 60 minutes or high-intensity workouts، performance may suffer without pre-workout nutrition.',
        ar: 'التمرين في حالة الصيام يمكن أن يعزز حرق الدهون من خلال زيادة تكسير الدهون وإفراز هرمون النمو. ومع ذلك، للجلسات التي تزيد عن 60 دقيقة أو التمارين عالية الكثافة، قد يعاني الأداء بدون تغذية قبل التمرين.'
      },
      guidelines: [
        { 
          en: 'Best for: Low to moderate intensity cardio, light resistance training', 
          ar: 'الأفضل لـ: كارديو منخفض إلى متوسط الشدة، تدريب مقاومة خفيف'
        },
        { 
          en: 'Avoid: Heavy strength training, HIIT sessions longer than 30 minutes', 
          ar: 'تجنب: تدريب القوة الشديد، جلسات HIIT أطول من 30 دقيقة'
        },
        { 
          en: 'Hydration: Electrolyte supplementation is crucial during fasted training', 
          ar: 'الترطيب: تكميل الليكترولايت ضروري أثناء التمرين في حالة الصيام'
        },
        { 
          en: 'Timing: Train at the beginning of your fasting window for best results', 
          ar: 'التوقيت: التمرين في بداية فترة الصيام لأفضل النتائج'
        }
      ],
      references: [
        { 
          en: 'Van Proeyen et al. (2010). Training in the fasted state improves glucose tolerance during high-fat diet.', 
          ar: 'فان بروين وآخرون (2010). التدريب في حالة الصيام يحسن تحمل الجلوكوز أثناء اتباع نظام غذائي عالي الدهون.'
        },
        { 
          en: 'Hackett & Haghi (2022). The effect of fasted-state exercise on appetite-regulating hormones.', 
          ar: 'هاكيت وهاغي (2022). تأثير التمرين في حالة الصيام على هرمونات تنظيم الشهية.'
        }
      ]
    },
    {
      title: { en: 'Biological Mechanisms', ar: 'الآليات البيولوجية' },
      content: {
        en: 'Fasted training increases AMPK activation and fatty acid oxidation while decreasing insulin levels. This metabolic shift enhances mitochondrial biogenesis and improves insulin sensitivity long-term. However, mTOR signaling (crucial for muscle growth) may be blunted without amino acid availability.',
        ar: 'التدريب في حالة الصيام يزيد من تنشيط AMPK وأكسدة الأحماض الدهنية مع تقليل مستويات الأنسولين. هذا التحول الأيضي يعزز تكوين الميتوكوندريا ويحسن حساسية الأنسولين على المدى الطويل. ومع ذلك، قد يتم إضعاف إشارات mTOR (الضرورية لنمو العضلات) بدون توفر الأحماض الأمينية.'
      },
      guidelines: [
        { 
          en: 'Protein timing: Ensure adequate protein intake during feeding windows to support muscle protein synthesis', 
          ar: 'توقيت البروتين: التأكد من تناول كمية كافية من البروتين خلال فترات الأكل لدعم تخليق بروتين العضلات'
        },
        { 
          en: 'Adaptation period: Allow 2-3 weeks for your body to adapt to fasted training', 
          ar: 'فترة التكيف: السماح بـ2-3 أسابيع لكي يتكيف جسمك مع التمرين في حالة الصيام'
        },
        { 
          en: 'Listen to your body: Discontinue fasted training if experiencing dizziness, extreme fatigue, or poor recovery', 
          ar: 'الاستماع لجسمك: التوقف عن التمرين في حالة الصيام إذا كنت تعاني من الدوخة، التعب الشديد، أو التعافي السيء'
        }
      ],
      references: [
        { 
          en: 'Moro et al. (2016). Effects of eight weeks of time-restricted feeding on basal metabolism and body composition.', 
          ar: 'مورا وآخرون (2016). تأثيرات ثمانية أسابيع من الصيام المقيد زمنياً على الأيض الأساسي وتكوين الجسم.'
        },
        { 
          en: 'Tinsley et al. (2019). Time-restricted feeding plus resistance training in active females.', 
          ar: 'تينسلي وآخرون (2019). الصيام المقيد زمنياً بالإضافة إلى تدريب المقاومة في الإناث النشيطات.'
        }
      ]
    }
  ],
  
  proTips: [
    {
      title: { en: 'Nutrient Timing', ar: 'توقيت المغذيات' },
      desc: { 
        en: 'Consume 20-40g protein within 2h post-workout for optimal recovery.',
        ar: 'تناول 20-40غ بروتين خلال ساعتين بعد التمرين للتعافي الأمثل.'
      }
    },
    {
      title: { en: 'Tempo Training', ar: 'تدريب الإيقاع' },
      desc: { 
        en: 'Use 3-1-2 tempo (eccentric-pause-concentric) for better hypertrophy.',
        ar: 'استخدم إيقاع 3-1-2 (تحمل-توقف-رفع) لبناء عضلات أفضل.'
      }
    },
    {
      title: { en: 'Mind-Muscle Connection', ar: 'اتصال العقل-العضلة' },
      desc: { 
        en: 'Focus on target muscle contraction. Quality over quantity.',
        ar: 'ركز على انقباض العضلة المستهدفة. الجودة أهم من الكمية.'
      }
    },
    {
      title: { en: 'Progressive Overload', ar: 'الزيادة التدريجية' },
      desc: { 
        en: 'Increase weight, reps, or sets weekly to force adaptation.',
        ar: 'زد الوزن، التكرارات، أو المجموعات أسبوعياً لإجبار التكيف.'
      }
    },
    {
      title: { en: 'Sleep Quality', ar: 'جودة النوم' },
      desc: { 
        en: '7-9 hours of quality sleep is essential for hormone regulation and recovery.',
        ar: '7-9 ساعات من النوم الجيد ضرورية لتنظيم الهرمونات والتعافي.'
      }
    },
    {
      title: { en: 'Deload Week', ar: 'أسابيع التخفيف' },
      desc: { 
        en: 'Every 6-8 weeks, reduce training volume by 40-60% to prevent overtraining.',
        ar: 'كل 6-8 أسابيع، قلل حجم التدريب بمقدار 40-60% لمنع الإفراط في التدريب.'
      }
    }
  ],
  
  timerInstructions: {
    title: { en: 'Timer Usage Guide', ar: 'دليل استخدام المؤقت' },
    steps: [
      {
        title: { en: 'Set Duration', ar: 'ضبط المدة' },
        desc: { 
          en: 'Enter minutes and seconds for your work or rest periods. For most exercises, 30-90 seconds rest is optimal.',
          ar: 'أدخل الدقائق والثواني لفترات العمل أو الراحة. لمعظم التمارين، راحة 30-90 ثانية مثالية.'
        }
      },
      {
        title: { en: 'Start/Pause', ar: 'بدء/إيقاف مؤقت' },
        desc: { 
          en: 'Press the Start button to begin timing. Use Pause to temporarily stop the timer without resetting.',
          ar: 'اضغط على زر البدء لبدء المؤقت. استخدم الإيقاف المؤقت لإيقاف المؤقت مؤقتاً دون إعادة الضبط.'
        }
      },
      {
        title: { en: 'Reset Timer', ar: 'إعادة ضبط المؤقت' },
        desc: { 
          en: 'Press Reset to clear the current time and start fresh for the next exercise or rest period.',
          ar: 'اضغط على إعادة الضبط لمسح الوقت الحالي والبدء من جديد للتمرين أو فترة الراحة التالية.'
        }
      },
      {
        title: { en: 'Rest Period Alert', ar: 'تنبيه فترة الراحة' },
        desc: { 
          en: 'When the timer reaches zero during rest periods, you\'ll receive an alert to begin your next set.',
          ar: 'عندما يصل المؤقت إلى الصفر أثناء فترات الراحة، ستتلقى تنبيهاً لبدء المجموعة التالية.'
        }
      },
      {
        title: { en: 'Exercise Sets', ar: 'مجموعات التمرين' },
        desc: { 
          en: 'For timing your exercise duration (e.g., planks, wall sits), set the timer before starting the movement.',
          ar: 'لتوقيت مدة التمرين (على سبيل المثال، اللوح الخشبي، الجلوس على الحائط)، قم بضبط المؤقت قبل بدء الحركة.'
        }
      }
    ]
  }
};