package com.referral.dao;

import java.util.LinkedHashSet;

import com.referral.model.Referrer;
import com.referral.model.Review;

public interface ReferrerDao {
	LinkedHashSet<Referrer> getAllReferrer();
	Referrer addReferrer(Referrer referrer);
	Referrer findReferrerByEmail(String email);
	boolean updateReferrer(Referrer referrer,String email);
}
