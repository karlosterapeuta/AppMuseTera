-- Create the function to insert admin user
CREATE OR REPLACE FUNCTION create_admin_user(
  admin_name TEXT,
  admin_email TEXT,
  admin_password TEXT,
  admin_register TEXT
) RETURNS json AS $$
DECLARE
  new_user json;
BEGIN
  INSERT INTO "User" (
    id,
    name,
    email,
    password,
    "professionalRegister",
    "createdAt",
    "updatedAt"
  ) VALUES (
    gen_random_uuid(),
    admin_name,
    admin_email,
    admin_password,
    admin_register,
    NOW(),
    NOW()
  )
  RETURNING json_build_object(
    'id', id,
    'name', name,
    'email', email,
    'professionalRegister', "professionalRegister"
  ) INTO new_user;
  
  RETURN new_user;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
