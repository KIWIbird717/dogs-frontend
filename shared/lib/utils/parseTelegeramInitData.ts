interface ParsedUser {
  id: number;
  first_name: string;
  username: string;
  language_code: string;
  is_premium: boolean;
  allows_write_to_pm: boolean;
}

interface ParsedQuery {
  query_id: string;
  user: ParsedUser;
  auth_date: number;
  hash: string;
}

export function parseTgInitData(queryString: string): ParsedQuery {
  const params = new URLSearchParams(queryString);

  const query_id = params.get("query_id") || "";
  const userJson = params.get("user") || "{}";
  const auth_date = Number(params.get("auth_date") || 0);
  const hash = params.get("hash") || "";

  let user: ParsedUser = {
    id: 0,
    first_name: "",
    username: "",
    language_code: "",
    is_premium: false,
    allows_write_to_pm: false,
  };

  try {
    user = JSON.parse(decodeURIComponent(userJson));
  } catch (e) {
    console.error("Error parsing user JSON", e);
  }

  return {
    query_id,
    user,
    auth_date,
    hash,
  };
}
