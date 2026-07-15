import { Stack } from "expo-router";
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { isClientError } from "../src/lib/apiClient";
import "../global.css";

// ─── Production-configured QueryClient ────────────────────────────────────────
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 5-minute stale time by default; screens can override per query
      staleTime: 5 * 60 * 1000,
      // Keep unused data for 10 minutes before garbage collection
      gcTime: 10 * 60 * 1000,
      // Don't retry 4xx client errors — retrying won't help
      retry: (failureCount, error) => failureCount < 2 && !isClientError(error),
      // Refetch when user returns to the app
      refetchOnWindowFocus: true,
      // Don't refetch just because the component remounts
      refetchOnMount: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

// ─── Root Error Boundary ──────────────────────────────────────────────────────
interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}
class RootErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, message: "" };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message };
  }

  handleReset = () => {
    this.setState({ hasError: false, message: "" });
    queryClient.clear();
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={eb.container}>
          <Text style={eb.emoji}>⚠️</Text>
          <Text style={eb.title}>Something went wrong</Text>
          <Text style={eb.message}>{this.state.message}</Text>
          <Pressable style={eb.btn} onPress={this.handleReset}>
            <Text style={eb.btnText}>Try Again</Text>
          </Pressable>
        </View>
      );
    }
    return this.props.children;
  }
}

const eb = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    backgroundColor: "#F8FAFC",
  },
  emoji: { fontSize: 48, marginBottom: 16 },
  title: { fontSize: 20, fontWeight: "700", color: "#111827", marginBottom: 8 },
  message: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
  },
  btn: {
    backgroundColor: "#0EA5E9",
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function Layout() {
  return (
    <RootErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#F8FAFC" },
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="select-sports" />
          <Stack.Screen name="auth" />
          <Stack.Screen name="phone-auth" />
          <Stack.Screen name="otp" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="product-list" />
          <Stack.Screen name="product/[id]" />
          <Stack.Screen name="checkout" />
          <Stack.Screen name="order-success" />
          <Stack.Screen name="track-order" />
          <Stack.Screen name="wishlist" />
        </Stack>
      </QueryClientProvider>
    </RootErrorBoundary>
  );
}
