package com.referral.security;

public enum ApplicationUserPermission {
    TEST_READ("test:read"),
    TEST_WRITE("test:write");

    private final String permission;

    ApplicationUserPermission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
