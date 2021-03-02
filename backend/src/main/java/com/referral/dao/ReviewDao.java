package com.referral.dao;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.UUID;

import com.referral.model.Review;

public interface ReviewDao {
	LinkedHashSet<Review> getAllReviews();
	
	Review addReview(Review review);
	
	Review findReviewById(UUID id);
	boolean deleteReview(UUID id);
	
	boolean updateReview(Review review,UUID id);
	
	LinkedHashSet<Review> getAllReferrerReviewsByEmail(String email);
	
}
