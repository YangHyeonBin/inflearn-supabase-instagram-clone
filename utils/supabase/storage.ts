// 스토리지 관련 유틸 함수들
import { createBrowserSupabaseClient } from "./client";

/**
 * supabase storage에서 저장하는 이미지 url을 가져오는 함수
 * getPublicUrl 함수를 사용하여 공개 URL을 생성
 */
export function getImageUrl(path: string) {
    const supabase = createBrowserSupabaseClient();
    const { data } = supabase.storage
        .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
        .getPublicUrl(path);

    return data.publicUrl;
}
