/**
 * ข้อมูลตำบลจังหวัดตราด (Trat Province Sub-districts)
 * 
 * ข้อมูลจาก Excel: tambon.xlsx (กรองเฉพาะ CHANGWAT_T = 'จ. ตราด')
 * รวมทั้งหมด 37 ตำบล จาก 7 อำเภอ
 * 
 * อัปเดตล่าสุด: 2024
 */

// ข้อมูลตำบลแยกตามอำเภอ พร้อมพิกัด GPS
export const TRAT_TAMBONS = {
  // ============================================
  // อำเภอเมืองตราด (Mueang Trat) - 13 ตำบล
  // ============================================
  'เมืองตราด': {
    'ชำราก': { lat: 12.19400, lng: 102.67700 },
    'ตะกาง': { lat: 12.25000, lng: 102.65900 },
    'ท่ากุ่ม': { lat: 12.34500, lng: 102.67500 },
    'ท่าพริก': { lat: 12.24300, lng: 102.58900 },
    'วังกระแจะ': { lat: 12.27200, lng: 102.47900, isCenter: true },
    'หนองคันทรง': { lat: 12.19400, lng: 102.54200 },
    'หนองเสม็ด': { lat: 12.21600, lng: 102.50400 },
    'หนองโสน': { lat: 12.18400, lng: 102.48800 },
    'ห้วงน้ำขาว': { lat: 12.14300, lng: 102.51800 },
    'ห้วยแร้ง': { lat: 12.38700, lng: 102.56000 },
    'อ่าวใหญ่': { lat: 12.07800, lng: 102.56200 },
    'เนินทราย': { lat: 12.28300, lng: 102.54700 },
    'แหลมกลัด': { lat: 12.11700, lng: 102.70400 },
  },

  // ============================================
  // อำเภอคลองใหญ่ (Khlong Yai) - 3 ตำบล
  // ชายแดนไทย-กัมพูชา - พื้นที่ใกล้ชายแดนมาก
  // ============================================
  'คลองใหญ่': {
    'คลองใหญ่': { lat: 11.77400, lng: 102.88900, isCenter: true },
    'หาดเล็ก': { lat: 11.69900, lng: 102.90900 }, // ด่านชายแดน
    'ไม้รูด': { lat: 11.91000, lng: 102.80500 },
  },

  // ============================================
  // อำเภอบ่อไร่ (Bo Rai) - 5 ตำบล
  // ติดชายแดน
  // ============================================
  'บ่อไร่': {
    'ช้างทูน': { lat: 12.58500, lng: 102.46900 },
    'ด่านชุมพล': { lat: 12.46100, lng: 102.66400 }, // ด่านชายแดน
    'นนทรีย์': { lat: 12.54400, lng: 102.60000 },
    'บ่อพลอย': { lat: 12.60400, lng: 102.55900, isCenter: true },
    'หนองบอน': { lat: 12.68300, lng: 102.44700 },
  },

  // ============================================
  // อำเภอเกาะกูด (Ko Kut) - 2 ตำบล
  // เกาะ
  // ============================================
  'เกาะกูด': {
    'เกาะกูด': { lat: 11.68800, lng: 102.54300, isCenter: true },
    'เกาะหมาก': { lat: 11.81825, lng: 102.43175 },
  },

  // ============================================
  // อำเภอเกาะช้าง (Ko Chang) - 2 ตำบล
  // เกาะ
  // ============================================
  'เกาะช้าง': {
    'เกาะช้าง': { lat: 12.11550, lng: 102.28400, isCenter: true },
    'เกาะช้างใต้': { lat: 11.99600, lng: 102.33100 },
  },

  // ============================================
  // อำเภอเขาสมิง (Khao Saming) - 8 ตำบล
  // ============================================
  'เขาสมิง': {
    'ทุ่งนนทรี': { lat: 12.40500, lng: 102.50100 },
    'ท่าโสม': { lat: 12.29600, lng: 102.34600 },
    'ประณีต': { lat: 12.52500, lng: 102.35900 },
    'วังตะเคียน': { lat: 12.47800, lng: 102.53100 },
    'สะตอ': { lat: 12.55300, lng: 102.43400 },
    'เขาสมิง': { lat: 12.34000, lng: 102.43700, isCenter: true },
    'เทพนิมิต': { lat: 12.46900, lng: 102.43500 },
    'แสนตุ้ง': { lat: 12.39800, lng: 102.38200 },
  },

  // ============================================
  // อำเภอแหลมงอบ (Laem Ngop) - 4 ตำบล
  // ============================================
  'แหลมงอบ': {
    'คลองใหญ่': { lat: 12.22600, lng: 102.36200 },
    'น้ำเชี่ยว': { lat: 12.20900, lng: 102.43600 },
    'บางปิด': { lat: 12.24100, lng: 102.30100 },
    'แหลมงอบ': { lat: 12.18600, lng: 102.41900, isCenter: true },
  },
}

// สร้าง flat list สำหรับง่ายต่อการใช้งาน
export const getAllTambons = () => {
  const result = []
  Object.entries(TRAT_TAMBONS).forEach(([amphoe, tambons]) => {
    Object.entries(tambons).forEach(([tambon, coords]) => {
      result.push({
        amphoe,
        tambon,
        fullName: `ต.${tambon} อ.${amphoe}`,
        ...coords
      })
    })
  })
  return result
}

// ค้นหาตำบลที่ใกล้ที่สุดจากพิกัด GPS
export const findNearestTambon = (lat, lng) => {
  const tambons = getAllTambons()
  let nearest = null
  let minDistance = Infinity

  tambons.forEach(tambon => {
    const distance = calculateDistance(lat, lng, tambon.lat, tambon.lng)
    if (distance < minDistance) {
      minDistance = distance
      nearest = { ...tambon, distance }
    }
  })

  return nearest
}

// Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// รายชื่ออำเภอ (สำหรับ dropdown)
export const AMPHOE_LIST = Object.keys(TRAT_TAMBONS)

// รายชื่อตำบลตามอำเภอ (สำหรับ dropdown)
export const getTambonsByAmphoe = (amphoe) => {
  if (!TRAT_TAMBONS[amphoe]) return []
  return Object.keys(TRAT_TAMBONS[amphoe])
}

// ดึงพิกัดตำบล
export const getTambonCoords = (amphoe, tambon) => {
  if (!TRAT_TAMBONS[amphoe] || !TRAT_TAMBONS[amphoe][tambon]) return null
  return TRAT_TAMBONS[amphoe][tambon]
}

export default TRAT_TAMBONS
